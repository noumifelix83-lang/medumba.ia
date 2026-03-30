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

// Click through onboarding
const clickNext = async () => {
  const btns = await page.$$('button');
  for (const btn of btns) {
    const txt = await page.evaluate(el => el.textContent?.trim(), btn);
    if (txt && (
      txt.includes('Commencer') || txt.includes('Get Started') ||
      txt.includes('Continuer') || txt.includes('Continue') ||
      txt.includes('Suivant') || txt.includes('Next') ||
      txt.includes('Skip') || txt.includes('Passer')
    )) {
      await btn.click();
      await new Promise(r => setTimeout(r, 400));
      return true;
    }
  }
  return false;
};

for (let i = 0; i < 25; i++) await clickNext();
await new Promise(r => setTimeout(r, 1000));

// Navigate to dictionary
const allBtns = await page.$$('button, [role="button"]');
for (const btn of allBtns) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && (txt.toLowerCase().includes('dict') || txt.includes('📖'))) {
    await btn.click();
    await new Promise(r => setTimeout(r, 1200));
    break;
  }
}

// ── Screenshot 1: search "lever" ──────────────────────────────────
const searchInput = await page.$('input[placeholder*="Search"], input[placeholder*="Recherch"], input[type="search"], input[placeholder*="word"], input[placeholder*="mot"]');
if (searchInput) {
  await searchInput.click();
  await searchInput.type('lever', { delay: 80 });
  await new Promise(r => setTimeout(r, 900));
}

await page.screenshot({ path: 'C:/Users/ndjan/Downloads/medumba/screenshots/home/dict-search-lever.png' });
console.log('✓ dict-search-lever.png');

// ── Screenshot 2: AI translator result ────────────────────────────
// Clear search first
if (searchInput) {
  await searchInput.click({ clickCount: 3 });
  await searchInput.press('Backspace');
  await new Promise(r => setTimeout(r, 500));
}

// Scroll down to find AI translator section
await page.evaluate(() => window.scrollTo(0, 600));
await new Promise(r => setTimeout(r, 400));

// Find the AI translator textarea and type a word
const textarea = await page.$('textarea[placeholder*="French"], textarea[placeholder*="français"], textarea[placeholder*="Enter"], textarea');
if (textarea) {
  await textarea.click();
  await textarea.type('le soleil se lève tôt', { delay: 60 });
  await new Promise(r => setTimeout(r, 400));

  // Click Translate button
  const btns2 = await page.$$('button');
  for (const btn of btns2) {
    const txt = await page.evaluate(el => el.textContent?.trim(), btn);
    if (txt && (txt.toLowerCase().includes('translat') || txt.toLowerCase().includes('traduire'))) {
      await btn.click();
      await new Promise(r => setTimeout(r, 3500)); // wait for AI response
      break;
    }
  }
}

await page.screenshot({ path: 'C:/Users/ndjan/Downloads/medumba/screenshots/home/dict-ai-result.png' });
console.log('✓ dict-ai-result.png');

await browser.close();
