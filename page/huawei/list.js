const log = require('../../common/log');
const item = require('./item');

const handlePage = async (page, itemBrowserPage, url, hasNext) => {
    await page.goto(url);
    log.info('=================listPage=======' + url);

    let handleData = async () => {
        const itemPage = await page.evaluate(() => {
            let aEles = document.querySelectorAll('#pro-list a');
            // let nextEle = document.querySelector('#search-pager .next');
            let currEle = document.querySelector('#search-pager .page-number.pgCurrent');
            let result = {
                urls: [],
                hasNext: !!currEle.nextElementSibling
            };

            aEles.forEach(ee => {
                if (result.urls.length) {
                    return;
                }

                result.urls.push(String(ee.href));
            })

            return result;
        });

        log.info('list itemPage: ', itemPage);

        try {
            for (let itemUrl of itemPage.urls) {
                log.info('itemUrl: ' + itemUrl);

                await item.handlePage(itemBrowserPage, itemUrl);

                await itemBrowserPage.waitFor(Math.random(10) * 2000);
            }

            if (itemPage.hasNext) {
                //  activates tab
                await page.bringToFront();
                await page.click('#search-pager .next');
                await handleData();
            }

        } catch (error) {
            log.error('list: ', error);
        }
    }

    await handleData();

}

module.exports = {
    handlePage
}