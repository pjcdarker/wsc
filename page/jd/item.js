const log = require('../../common/log');
const deviceService = require('../../device/deviceService');
const Device = require('../../device/device');

const handlePage = async (page, url) => {
    await page.goto(url);
    log.info('=================handleItemPage=======' + url)

    const result = await page.evaluate(() => {

        let labelKeys = new Set();
        labelKeys.add('屏幕');
        labelKeys.add('主体');

        let funcMap = new Map();
        funcMap.set('入网型号', (o, v) => o.model = v);
        funcMap.set('产品名称', (o, v) => o.prodName = v);
        funcMap.set('品牌', (o, v) => o.make = v);
        funcMap.set('分辨率', (o, v) => o.sc = v);
        funcMap.set('主屏幕尺寸（英寸）', (o, v) => o.inch = v);

        let result = {
            url: document.location.href,
            model: undefined,
            prodName: undefined,
            make: undefined,
            sc: undefined,
            inch: undefined,
            price: undefined
        }

        try {
            let itemEles = document.querySelectorAll('.Ptable-item')
            itemEles.forEach(e => {
                if (!labelKeys.has(e.querySelector('h3').innerText)) {
                    return;
                }

                let dlEles = e.querySelectorAll("dl > dl");
                dlEles.forEach(dl => {
                    let dt = dl.querySelector("dt");
                    let ddEles = dl.querySelectorAll("dd");
                    if (ddEles.length) {
                        let f = funcMap.get(dt.innerText);
                        if (f) {
                            f(result, ddEles[ddEles.length - 1].innerText);
                        }
                    }
                })
            })

            let priceEle = document.querySelector('.p-price > .price')
            if (priceEle) {
                result.price = priceEle.innerText;
            }

            return result;
        } catch (error) {
            log.error('result error: ', error);
        }

        return result;

    });

    log.info('result: ', result)

    try {
        let device = new Device();
        device.setUrl(result.url);
        device.setModel(result.model);
        device.setProdName(result.prodName);
        device.setMake(result.make);
        device.setSc(result.sc);
        device.setInch(result.inch);
        device.setPrice(result.price);

        deviceService.save(device);

    } catch (error) {
        log.error('item save: ', error)
    }
}

module.exports = {
    handlePage
}