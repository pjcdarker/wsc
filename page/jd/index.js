
const chromium = require('../chromium');
const listPage = require('./list');

(async () => {
    const browser = chromium.launch();
    const page = await browser.newPage();

    // https://list.jd.com/list.html?cat=9987,653,655&page=1&sort=sort_rank_asc&trans=1&JL=6_0_0#J_main
    let pageUrl = 'https://list.jd.com/list.html?cat=9987,653,655&page=1&sort=sort_rank_asc&trans=1&JL=6_0_0';
    await listPage.handlePage(page, pageUrl);

    // await browser.close();
})();
