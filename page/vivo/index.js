const chromium = require('../chromium');
const listPage = require('./list');

(async () => {
    const browser = await chromium.launch();
    const mainPage = await browser.newPage();

    let pageUrl = 'https://www.vivo.com.cn';
    await listPage.handlePage(mainPage, pageUrl);

    // await browser.close();
})();
