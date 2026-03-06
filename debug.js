const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('Console:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('Error:', err.message));
    
    await page.goto('http://119.29.209.212/gallery.html', { waitUntil: 'networkidle', timeout: 15000 });
    
    // Check if button exists
    const btn = await page.$('#addAnimalBtn');
    console.log('Button exists:', !!btn);
    
    // Check if click handler is attached
    const bound = await page.evaluate(() => {
        const btn = document.getElementById('addAnimalBtn');
        return btn && btn.onclick !== null;
    });
    console.log('Has onclick:', bound);
    
    // Try clicking
    await page.click('#addAnimalBtn');
    await page.waitForTimeout(1000);
    
    const modal = await page.$('#addAnimalModal.active');
    console.log('Modal active:', !!modal);
    
    await browser.close();
})();
