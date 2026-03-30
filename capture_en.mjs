import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/ndjan/AppData/Local/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });

await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
await new Promise(r => setTimeout(r, 2000));

// Click through onboarding — choose English
const clickNext = async () => {
  const btns = await page.$$('button');
  for (const btn of btns) {
    const txt = await page.evaluate(el => el.textContent?.trim(), btn);
    if (txt && (
      txt.includes('Commencer') || txt.includes('Get Started') ||
      txt.includes('Continuer') || txt.includes('Continue') ||
      txt.includes('Suivant') || txt.includes('Next') ||
      txt.includes('Skip') || txt.includes('Passer') ||
      txt.includes('English') || txt.includes('Anglais')
    )) {
      await btn.click();
      await new Promise(r => setTimeout(r, 400));
      return;
    }
  }
};

// Step 1: pick English on language selection screen
const langBtns = await page.$$('button');
for (const btn of langBtns) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && (txt.includes('English') || txt.includes('🇺🇸'))) {
    await btn.click();
    await new Promise(r => setTimeout(r, 500));
    console.log('✓ selected English');
    break;
  }
}

for (let i = 0; i < 25; i++) await clickNext();
await new Promise(r => setTimeout(r, 1000));

// Navigate to dictionary
const allBtns = await page.$$('button');
for (const btn of allBtns) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && txt.toLowerCase().includes('dict')) {
    await btn.click();
    await new Promise(r => setTimeout(r, 1200));
    break;
  }
}

// Switch to French tab (searching French → Medumba)
const tabs = await page.$$('button');
for (const btn of tabs) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && (txt.includes('Français') || txt.includes('French'))) {
    await btn.click();
    await new Promise(r => setTimeout(r, 500));
    console.log('✓ switched to French tab');
    break;
  }
}

// Search "to wake up"
const searchInput = await page.$('input[placeholder*="Search"], input[placeholder*="Recherch"], input[placeholder*="word"], input[placeholder*="mot"]');
if (searchInput) {
  await searchInput.click();
  await searchInput.type('lever', { delay: 80 });
  await new Promise(r => setTimeout(r, 1000));
}

await page.screenshot({ path: 'C:/Users/ndjan/Downloads/medumba/screenshots/home/dict-search-en.png' });
console.log('✓ dict-search-en.png saved');

// ── AI: "thank you very much" ─────────────────────────────────────
// Clear search
if (searchInput) {
  await searchInput.click({ clickCount: 3 });
  await searchInput.press('Backspace');
  await new Promise(r => setTimeout(r, 400));
}

// Scroll to AI widget
await page.evaluate(() => window.scrollTo(0, 600));
await new Promise(r => setTimeout(r, 400));

// Switch AI direction to French → Medumba if needed, then type English
const textarea = await page.$('textarea');
if (textarea) {
  await textarea.click();
  await textarea.type('thank you very much', { delay: 60 });
  await new Promise(r => setTimeout(r, 400));

  const btns2 = await page.$$('button');
  for (const btn of btns2) {
    const txt = await page.evaluate(el => el.textContent?.trim(), btn);
    if (txt && (txt.toLowerCase().includes('translat') || txt.toLowerCase().includes('traduire'))) {
      await btn.click();
      console.log('✓ clicked Translate');
      break;
    }
  }

  // Wait for AI response
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    const content = await page.evaluate(() => document.body.innerText);
    if (!content.includes('Translating') && !content.includes('analyzing')) {
      console.log('✓ AI responded');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));
}

await page.evaluate(() => window.scrollTo(0, 400));
await new Promise(r => setTimeout(r, 300));

await page.screenshot({ path: 'C:/Users/ndjan/Downloads/medumba/screenshots/home/dict-ai-en.png' });
console.log('✓ dict-ai-en.png saved');

await browser.close();
