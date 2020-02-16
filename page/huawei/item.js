const log = require('../../common/log');

const deviceService = require('../../device/deviceService');
const Device = require('../../device/device');

const handlePage = async (page, url) => {
    await page.goto(url);
    log.info('=================handleItemPage=======' + url)

    const result = await page.evaluate(() => {
        let funcMap = new Map();
        funcMap.set('型号', (o, v) => o.model = v);
        funcMap.set('传播名', (o, v) => o.prodName = v);
        funcMap.set('品牌', (o, v) => o.make = String(v).includes('荣耀') ? 'honor' : 'huawei');
        funcMap.set('分辨率', (o, v) => o.sc = v);
        funcMap.set('屏幕尺寸', (o, v) => o.inch = v);

        let result = {
            url: document.location.href,
            model: undefined,
            prodName: undefined,
            make: undefined,
            sc: undefined,
            inch: undefined,
            price: document.querySelector('#pro-price').innerText
        }

        let parse = eles => {
            eles.forEach(e => {
                let label = e.querySelector('label');
                let f = funcMap.get(label.innerText);
                if (f) {
                    f(result, e.querySelector('span').innerText);
                }
            });
        }

        try {
            let mainLiEles = document.querySelectorAll('.product-parameter-main li');
            let liEles = document.querySelector('.product-parameter-list').querySelectorAll('li');
            parse(mainLiEles);
            parse(liEles);

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