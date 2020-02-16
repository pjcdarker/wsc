const chromium = require('../chromium');
const listPage = require('./list');

(async () => {
    const browser = await chromium.launch();

    const mainPage = await browser.newPage();
    const itemBrowserPage = await browser.newPage();

    let pageUrl = 'https://www.vmall.com/list-36';
    await listPage.handlePage(mainPage, itemBrowserPage, pageUrl);

    // await browser.close();
})();
