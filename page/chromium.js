const puppeteer = require('puppeteer');

const launch = async () => {
    return await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    })
};

module.exports = {
    launch
};