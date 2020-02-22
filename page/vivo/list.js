const log = require('../../common/log');
const item = require('./item');

const handlePage = async (page, url) => {
    await page.goto(url);
    log.info('=================listPage=======' + url);

    const seriesPage = await page.evaluate(() => {
        let aEles = document.querySelectorAll('.vp-head-series-wrapper .vp-head-product-links-default > div > a:first-child');
        let result = {
            urls: []
        };

        aEles.forEach(ee => {
            result.urls.push(String(ee.href));
        });

        return result;
    });

    const handleSeriesPage = async (page, url) => {
        await page.goto(url);
        log.info('=================handleSeriesPage=======' + url);

        const result = await page.evaluate(() => {
            let aEles = document.querySelectorAll('.swiper-wrapper > li > a');;
            let result = [];
            aEles.forEach(ee => {
                let href = String(ee.href);
                let arr = href.split('/');
                let index = arr.length - 1;
                if (href.endsWith('/')) {
                    index -= 1;
                }

                result.push(arr[index]);
            });

            return result;
        });

        return result;
    };

    log.info('seriesPage: ', seriesPage);

    try {
        let items = [];
        for (let seriesUrl of seriesPage.urls) {
            let products = await handleSeriesPage(page, seriesUrl);
            log.info('products: ', products);

            items = items.concat(products);
        }

        log.info('items: ', items);

        for (let p of items) {
            await item.handlePage(page, p);
        }

    } catch (error) {
        log.error('list: ', error);
    }
}

module.exports = {
    handlePage
}