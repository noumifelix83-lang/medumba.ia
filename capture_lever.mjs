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
      return;
    }
  }
};
for (let i = 0; i < 25; i++) await clickNext();
await new Promise(r => setTimeout(r, 1000));

// Navigate to dictionary
const allBtns = await page.$$('button, [role="button"]');
for (const btn of allBtns) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && txt.toLowerCase().includes('dict')) {
    await btn.click();
    await new Promise(r => setTimeout(r, 1200));
    break;
  }
}

// Switch language toggle to "Français" (FR tab)
const langBtns = await page.$$('button');
for (const btn of langBtns) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && (txt.includes('Français') || txt.includes('Francais') || txt.toLowerCase().includes('fr français'))) {
    await btn.click();
    await new Promise(r => setTimeout(r, 500));
    console.log('✓ switched to Français');
    break;
  }
}

// Type "lever" in search
const searchInput = await page.$('input[placeholder*="Search"], input[placeholder*="Recherch"], input[placeholder*="word"], input[placeholder*="mot"]');
if (searchInput) {
  await searchInput.click();
  await searchInput.type('lever', { delay: 80 });
  await new Promise(r => setTimeout(r, 1200));
}

await page.screenshot({ path: 'C:/Users/ndjan/Downloads/medumba/screenshots/home/dict-search-lever.png' });
console.log('✓ dict-search-lever.png saved');

await browser.close();
