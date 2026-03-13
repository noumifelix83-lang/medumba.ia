import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const BASE = 'http://localhost:5173';
const OUT  = './screenshots';

// Phone viewport
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

async function shot(page, name) {
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
    console.log(`✓ ${name}.png`);
}

async function click(page, text) {
    // find button/div containing text and click it
    await page.evaluate((t) => {
        const els = [...document.querySelectorAll('button, div, span')];
        const el = els.find(e => e.textContent.trim().startsWith(t));
        if (el) el.click();
    }, text);
    await new Promise(r => setTimeout(r, 600));
}

(async () => {
    await mkdir(OUT, { recursive: true });
    const browser = await puppeteer.launch({ headless: true });
    const page    = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // 1. Splash
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    await shot(page, '00-splash');

    // Wait for splash to finish auto-advance (it usually auto-advances)
    await new Promise(r => setTimeout(r, 3000));
    await shot(page, '01-welcome');

    // Click Continue / COMMENCER MON VOYAGE
    await click(page, 'COMMENCER');
    await shot(page, '02-language-selection');

    // Select French native, click continue
    await page.select('select', 'french').catch(() => {});
    await new Promise(r => setTimeout(r, 300));
    await click(page, 'Continuer');
    await shot(page, '03-proficiency');

    // Pick level 1
    await page.evaluate(() => {
        const cards = document.querySelectorAll('[style*="cursor: pointer"]');
        if (cards[0]) cards[0].click();
    });
    await new Promise(r => setTimeout(r, 300));
    await click(page, 'Continuer');
    await shot(page, '04-reason');

    // Pick first reason
    await page.evaluate(() => {
        const cards = document.querySelectorAll('[style*="cursor: pointer"]');
        if (cards[0]) cards[0].click();
    });
    await new Promise(r => setTimeout(r, 300));
    await click(page, 'Continuer');
    await shot(page, '05-achieve');

    // Pick first goal
    await page.evaluate(() => {
        const cards = document.querySelectorAll('[style*="cursor: pointer"]');
        if (cards[0]) cards[0].click();
    });
    await new Promise(r => setTimeout(r, 300));
    await click(page, 'Continuer');
    await shot(page, '06-daily-goal');

    // Pick first daily goal
    await page.evaluate(() => {
        const cards = document.querySelectorAll('[style*="cursor: pointer"]');
        if (cards[0]) cards[0].click();
    });
    await new Promise(r => setTimeout(r, 300));
    await click(page, 'Continuer');
    await shot(page, '07-profile-welcome');

    // Skip profile creation → goes to Hub
    await click(page, 'PASSER');
    await new Promise(r => setTimeout(r, 800));
    await shot(page, '08-hub');

    // Click Calendar card
    await page.evaluate(() => {
        const els = [...document.querySelectorAll('div')];
        const el = els.find(e => e.textContent.includes('Calendrier') && e.style.cursor === 'pointer');
        if (el) el.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await shot(page, '09-calendar');

    // Go back to hub
    await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        const back = [...btns].find(b => b.textContent.includes('←'));
        if (back) back.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Click Counting card
    await page.evaluate(() => {
        const els = [...document.querySelectorAll('div')];
        const el = els.find(e => e.textContent.includes('Compter') && e.style.cursor === 'pointer');
        if (el) el.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await shot(page, '10-counting');

    // Go back → click Dictionary
    await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        const back = [...btns].find(b => b.textContent.includes('←'));
        if (back) back.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.evaluate(() => {
        const els = [...document.querySelectorAll('div')];
        const el = els.find(e => e.textContent.includes('Dictionnaire') && e.style.cursor === 'pointer');
        if (el) el.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await shot(page, '11-dictionary');

    // Go back → Start Courses → Dashboard
    await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        const back = [...btns].find(b => b.textContent.includes('←'));
        if (back) back.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.evaluate(() => {
        const els = [...document.querySelectorAll('div')];
        const el = els.find(e => e.textContent.includes('Commencer maintenant') && e.style.cursor === 'pointer');
        if (el) el.click();
    });
    await new Promise(r => setTimeout(r, 800));
    await shot(page, '12-dashboard');

    await browser.close();
    console.log('\nAll screenshots saved to ./screenshots/');
})();
