const reg = require('../common/reg')

class Device {
    model;
    prodName;
    make;
    sc;
    inch;
    url;
    price;

    isValid() {
        if (!this.model) {
            return false;
        }

        if (reg.ischina(this.model)) {
            return false;
        }

        return (this.make || this.prodName) && this.price && this.url;
    }

    setModel(model) {
        if (!model) {
            return;
        }
        this.model = String(model).toLowerCase();
    }

    setProdName(prodName) {
        this.prodName = prodName;
    }

    setSc(sc) {
        this.sc = sc;
    }

    setMake(make) {
        if (!make) {
            return;
        }
        this.make = String(make).toLowerCase();
    }

    setInch(inch) {
        if (inch) {
            this.inch = inch.trim().replace('英寸', '');
        }
    }

    setUrl(url) {
        this.url = url;
    }

    setPrice(price) {
        this.price = parseInt(String(price)
            .replace('¥', '')
            .replace('元', '')
            .replace('；', ''));
    }
}

module.exports = Device