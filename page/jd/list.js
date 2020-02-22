const log = require('../../common/log');
const item = require('./item');

const handlePage = async (page, url) => {
    await page.goto(url);
    log.info('=================listPage=======' + url)

    const itemPage = await page.evaluate(() => {
        let e = document.querySelector('#plist')
        let aEles = e.querySelectorAll('.gl-warp > .gl-item .p-name > a')
        let nextPage = document.querySelector('.p-num > .pn-next');
        let result = {
            urls: [],
            next: nextPage ? nextPage.href : undefined
        };

        aEles.forEach(ee => {
            let url = String(ee.href)
            if (url.startsWith('https://item.jd.com/')) {
                result.urls.push(url)
            }
        })

        return result;
    });

    log.info('list itemPage: ', itemPage);
    try {
        for (let itemUrl of itemPage.urls) {
            log.info('itemUrl: ', itemUrl);

            await item.handlePage(page, itemUrl);

            await page.waitFor(Math.random(10) * 2000);
        }

        if (itemPage.next && String(itemPage.next).startsWith('http')) {
            await handlePage(page, itemPage.next);
        }

    } catch (error) {
        log.error('list: ', error);
    }
}

module.exports = {
    handlePage
}