import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const BASE = 'http://localhost:5173';
const OUT  = './screenshots/home';
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function shot(page, name) {
    await wait(700);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
    console.log(`✓ ${name}.png`);
}

async function clickSection(page, label) {
    await page.evaluate((lbl) => {
        const btns = [...document.querySelectorAll('button')];
        const el = btns.find(b => b.innerText?.includes(lbl));
        if (el) el.click();
        else console.warn('NOT FOUND:', lbl);
    }, label);
    await wait(1000);
}

async function clickBack(page) {
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('←'));
        if (b) b.click();
    });
    await wait(800);
}

async function goToHome(page) {
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await wait(3500); // splash auto-advance
}

(async () => {
    await mkdir(OUT, { recursive: true });
    const browser = await puppeteer.launch({ headless: true });
    const page    = await browser.newPage();
    await page.setViewport(VIEWPORT);

    await goToHome(page);

    // ── Home page ────────────────────────────────────────────────────
    await shot(page, '01-home');

    // ── Calendrier ───────────────────────────────────────────────────
    await clickSection(page, 'Calendrier');
    await shot(page, '02-calendar');
    await page.evaluate(() => window.scrollBy(0, 400));
    await shot(page, '02-calendar-scroll');
    await clickBack(page);

    // ── Numérotation ─────────────────────────────────────────────────
    await clickSection(page, 'Numérotation');
    await shot(page, '03-counting');
    await page.evaluate(() => window.scrollBy(0, 400));
    await shot(page, '03-counting-scroll');
    await clickBack(page);

    // ── Dictionnaire ─────────────────────────────────────────────────
    await clickSection(page, 'Dictionnaire');
    await shot(page, '04-dictionary');
    await page.evaluate(() => {
        const input = document.querySelector('input');
        if (input) {
            input.focus();
            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
                  .set.call(input, 'nj');
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    await wait(500);
    await shot(page, '04-dictionary-search');
    await clickBack(page);

    // ── Vidéos ───────────────────────────────────────────────────────
    await clickSection(page, 'Vidéos');
    await shot(page, '05-videos');
    await page.evaluate(() => window.scrollBy(0, 400));
    await shot(page, '05-videos-scroll');
    await clickBack(page);

    // ── Home final ───────────────────────────────────────────────────
    await shot(page, '06-home-final');

    await browser.close();
    console.log(`\nAll screenshots saved to ${OUT}/`);
})();
