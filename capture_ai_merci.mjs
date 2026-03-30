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
const allBtns = await page.$$('button');
for (const btn of allBtns) {
  const txt = await page.evaluate(el => el.textContent?.trim(), btn);
  if (txt && txt.toLowerCase().includes('dict')) {
    await btn.click();
    await new Promise(r => setTimeout(r, 1200));
    break;
  }
}

// Scroll to AI translator widget
await page.evaluate(() => window.scrollTo(0, 600));
await new Promise(r => setTimeout(r, 400));

// Type "merci beaucoup" in AI textarea
const textarea = await page.$('textarea');
if (textarea) {
  await textarea.click();
  await textarea.type('merci beaucoup', { delay: 60 });
  await new Promise(r => setTimeout(r, 400));

  // Click Translate button
  const btns2 = await page.$$('button');
  for (const btn of btns2) {
    const txt = await page.evaluate(el => el.textContent?.trim(), btn);
    if (txt && (txt.toLowerCase().includes('translat') || txt.toLowerCase().includes('traduire'))) {
      await btn.click();
      console.log('✓ clicked Translate');
      break;
    }
  }

  // Wait for AI to respond — poll until "Translating..." disappears (max 20s)
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

// Scroll to show the result clearly
await page.evaluate(() => window.scrollTo(0, 400));
await new Promise(r => setTimeout(r, 300));

await page.screenshot({ path: 'C:/Users/ndjan/Downloads/medumba/screenshots/home/dict-ai-merci.png' });
console.log('✓ dict-ai-merci.png saved');

await browser.close();
