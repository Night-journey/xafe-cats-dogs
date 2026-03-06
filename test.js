const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => { if(msg.type()==='error') errors.push(msg.text()) });
    
    await page.goto('http://119.29.209.212/gallery.html', { waitUntil: 'networkidle', timeout: 15000 });
    console.log('1. 页面加载', errors.length===0?'✓':'✗');
    
    await page.click('#addAnimalBtn');
    await page.waitForTimeout(500);
    let modal = await page.$('#addAnimalModal.active');
    console.log('2. 添加弹窗', modal?'✓':'✗');
    
    if(modal){
        await page.fill('#addAnimalForm input[name="name"]', '测试');
        await page.fill('#addAnimalForm input[name="location"]', '地点');
        await page.click('#addAnimalForm button[type="submit"]');
        await page.waitForTimeout(500);
    }
    
    let cards = await page.$$('.gallery-card');
    console.log('3. 卡片数', cards.length);
    console.log('Errors:', errors);
    await browser.close();
})();
