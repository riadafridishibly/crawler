class PageScraper {
    constructor(url) {
        this.url = url
    }
    async scrape(browser) {
        let page = await browser.newPage()
        await page.goto(this.url)
        const hrefs = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]'), a => a.getAttribute('href')))
        let ret = {}

        for (const url of hrefs) {
            if (url.includes('facebook')) { // consider case?
                if (ret['facebook']) {
                    ret.facebook.push(url)
                } else {
                    ret.facebook = []
                }
            } else if (url.includes('instagram')) {
                if (ret['insagram']) {
                    ret.insagram.push(url)
                } else {
                    ret.insagram = []
                }
            } else if (url.includes('linkedin')) {
                if (ret['linkedin']) {
                    ret.linkedin.push(url)
                } else {
                    ret.linkedin = []
                }
            }
        }
        return ret
    }
}

module.exports = {PageScraper}