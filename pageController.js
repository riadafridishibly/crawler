const {PageScraper} = require('./pageScraper')
const {client_info} = require('./models')

async function scrapeAll(browserPromise, pageURL) {
    let browser
    try {
        browser = await browserPromise
        const obj = await new PageScraper(pageURL).scrape(browser)
        const txt_data = JSON.stringify(obj)
        console.log(pageURL, obj)
        await client_info.create({site_addr: pageURL, data: txt_data})
        return obj
    } catch (err) {
        console.log(err)
    }
}

module.exports = async (browserPromise, pageURL) => {
    return scrapeAll(browserPromise, pageURL)
}