async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0
            var distance = 100
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                totalHeight += distance

                if(totalHeight >= scrollHeight){
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
    })
}


const login_url = 'https://facebook.com/login'

async function extractReactions(browser, about_url) {
    try {
        const page = await browser.newPage()
        page.setViewport({width: 1200, height: 800})
        await page.setRequestInterception(true)
        page.on('request', (req) => {
            if (req.resourceType() === 'image') req.abort()
            else req.continue()
        })
        page.on('dialog', async dialog => {
            dialog.accept()
        })

        await page.goto(login_url, { waitUntil: 'networkidle2', timeout: 3000000 })
        await page.type('#email', process.env.FBEMAIL, {delay:30})
        await page.type('#pass', process.env.FBPASS, {delay:30})
        await page.click('#loginbutton')
        await page.waitForNavigation({waitUntil: 'networkidle0'})

        await page.goto(about_url)
        await autoScroll(page)

        let data = await page.$eval('body > div', elms => {
            return elms.innerHTML
        })

        // 1st one likes, 2nd one follow...
        let ret = {}
        let count = 0
        for (const res of [...data.matchAll(/\b\d+(?:,\d+)* people/g)]) {
            if (count == 0) {
                ret['likes'] = res[0] // parsing?
            } else {
                ret['followers'] = res[0] // parsing?
                break
            }
        }

        return ret

    } catch (err) {
        console.error(err)
    }
}

module.exports = extractReactions