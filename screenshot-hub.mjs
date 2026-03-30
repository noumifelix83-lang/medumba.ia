import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const BASE = 'http://localhost:5173';
const OUT  = './screenshots/hub';
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function shot(page, name) {
    await wait(700);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
    console.log(`✓ ${name}.png`);
}

// Click the first element matching a selector that contains the given text
async function clickText(page, text) {
    await page.evaluate((t) => {
        const all = [...document.querySelectorAll('button, div, span, p')];
        const el  = all.find(e => e.childElementCount === 0 && e.textContent.trim() === t);
        if (el) el.click();
    }, text);
    await wait(500);
}

// Fast-forward through onboarding to reach the hub
async function goToHub(page) {
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await wait(3500); // splash auto-advance

    // Welcome → click "COMMENCER MON VOYAGE"
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('COMMENCER'));
        if (b) b.click();
    });
    await wait(600);

    // Language selection → pick French, click Continuer
    await page.evaluate(() => {
        const selects = document.querySelectorAll('select');
        if (selects[0]) selects[0].value = 'french';
        selects[0]?.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await wait(300);
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('Continuer'));
        if (b) b.click();
    });
    await wait(600);

    // Proficiency → pick first card
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        if (cards[0]) cards[0].click();
    });
    await wait(300);
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('Continuer'));
        if (b) b.click();
    });
    await wait(600);

    // Reason → pick first card
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        if (cards[0]) cards[0].click();
    });
    await wait(300);
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('Continuer'));
        if (b) b.click();
    });
    await wait(600);

    // Achieve → pick first card
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        if (cards[0]) cards[0].click();
    });
    await wait(300);
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('Continuer'));
        if (b) b.click();
    });
    await wait(600);

    // Daily goal → pick first option
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        if (cards[0]) cards[0].click();
    });
    await wait(300);
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('Continuer'));
        if (b) b.click();
    });
    await wait(600);

    // Profile welcome → skip
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('PASSER'));
        if (b) b.click();
    });
    await wait(800);
}

async function clickBack(page) {
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.includes('←'));
        if (b) b.click();
    });
    await wait(600);
}

(async () => {
    await mkdir(OUT, { recursive: true });
    const browser = await puppeteer.launch({ headless: true });
    const page    = await browser.newPage();
    await page.setViewport(VIEWPORT);

    await goToHub(page);

    // ── Hub main (no sections visited yet) ──────────────────────────
    await shot(page, 'hub-01-main');

    // ── Calendar ────────────────────────────────────────────────────
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        const c = cards.find(e => e.innerText?.includes('Calendrier'));
        if (c) c.click();
    });
    await shot(page, 'hub-02-calendar');

    // Scroll down to show more of calendar
    await page.evaluate(() => window.scrollBy(0, 400));
    await shot(page, 'hub-02-calendar-scroll');

    await clickBack(page);

    // ── Counting ────────────────────────────────────────────────────
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        const c = cards.find(e => e.innerText?.includes('Compter') || e.innerText?.includes('Counting'));
        if (c) c.click();
    });
    await shot(page, 'hub-03-counting');

    await page.evaluate(() => window.scrollBy(0, 400));
    await shot(page, 'hub-03-counting-scroll');

    await clickBack(page);

    // ── Dictionary ──────────────────────────────────────────────────
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        const c = cards.find(e => e.innerText?.includes('Dictionnaire'));
        if (c) c.click();
    });
    await shot(page, 'hub-04-dictionary-empty');

    // Type a search query
    await page.evaluate(() => {
        const input = document.querySelector('input[type="text"], input[placeholder]');
        if (input) {
            input.focus();
            const nativeInput = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
            nativeInput.set.call(input, 'ma');
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    await wait(500);
    await shot(page, 'hub-04-dictionary-results');

    await clickBack(page);

    // ── Videos ──────────────────────────────────────────────────────
    await page.evaluate(() => {
        const cards = [...document.querySelectorAll('div[style*="cursor: pointer"]')];
        const c = cards.find(e => e.innerText?.includes('Vidéos'));
        if (c) c.click();
    });
    await shot(page, 'hub-05-videos');

    await page.evaluate(() => window.scrollBy(0, 400));
    await shot(page, 'hub-05-videos-scroll');

    await clickBack(page);

    // ── Hub with all 4 sections visited (progress = 80%) ────────────
    await shot(page, 'hub-06-main-progress');

    // ── Scroll hub to show CTA section ──────────────────────────────
    await page.evaluate(() => window.scrollBy(0, 500));
    await shot(page, 'hub-07-main-cta');

    await browser.close();
    console.log(`\nAll hub screenshots saved to ${OUT}/`);
})();
