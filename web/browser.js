const puppeteer = require('puppeteer')


async function openBrowser() {
    let browser
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-notifications',
                '--disable-setuid-sandbox'
            ],
            ignoreHTTPSErrors: true
        })
    } catch(e) {
        console.log(e)
    }
    return browser
}

module.exports = openBrowser