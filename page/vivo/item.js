const log = require('../../common/log');

const deviceService = require('../../device/deviceService');
const Device = require('../../device/device');

const handlePage = async (page, product) => {
    const url = 'https://www.vivo.com.cn/vivo/param/' + product;
    await page.goto(url);
    log.info('=================handleItemPage=======' + url);

    const result = await page.evaluate(() => {
        let funcMap = new Map();
        funcMap.set('价格', (o, eles) => {
            let model = [];
            let price;
            if (eles.length == 1) {
                let content = eles[0].innerText.trim().split('\n')
                String(content[0]).replace('全网通', '')
                    .replace('移动全网通', '')
                    .replace('：', '')
                    .split('|')
                    .forEach(e => {
                        model.push(e.replace('（', '').replace('）', '').trim())
                    });

                let content2 = String(content[1]).split('：');
                if (content2.length > 1) {
                    price = content2[1];
                }
            }

            o.model = model;
            o.price = price;
        });
        funcMap.set('屏幕显示', (o, eles) => {
            let sc;
            let inch;
            if (eles.length) {
                sc = eles[0].innerText
            }

            if (eles.length > 1) {
                inch = eles[1].innerText
            }

            o.sc = sc;
            o.inch = inch;
        });

        let result = {
            model: undefined,
            prodName: undefined,
            make: undefined,
            sc: undefined,
            inch: undefined,
            price: undefined
        }

        try {
            let productEles = document.querySelectorAll('.productColor');
            productEles.forEach(e => {
                let label = e.querySelector('.leftBox > div').innerText;
                let f = funcMap.get(label)
                if (!f) {
                    return;
                }

                let dataLineEles = e.querySelectorAll('.rightBox > .dataLine > div');
                f(result, dataLineEles);
            });

            return result;
        } catch (error) {
            log.error('result error: ', error);
        }

        return result;
    });

    result.prodName = product;
    result.make = 'vivo';
    result.url = url;

    log.info('result: ', result);

    try {
        if (!result.model.length) {
            result.model.push(product);
        }
        result.model.forEach(m => {
            let device = new Device();
            device.setUrl(result.url);
            device.setModel(m);
            device.setProdName(result.prodName);
            device.setMake(result.make);
            device.setSc(result.sc);
            device.setInch(result.inch);
            device.setPrice(result.price);

            deviceService.save(device);
        });

    } catch (error) {
        log.error('item save: ', error)
    }
}

module.exports = {
    handlePage
}