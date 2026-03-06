const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto('http://119.29.209.212/gallery.html', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('Errors:', errors.length ? errors : 'None');
    console.log('Cards:', (await page.$$('.gallery-card')).length);
    await browser.close();
})();
