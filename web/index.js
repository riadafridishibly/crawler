
const {sequelize, client_info} = require('./models')
const express = require('express')

const openBrowser = require('./browser.js')
const scraperController = require('./pageController')
let browserPromise = openBrowser()

const app = express()
app.use(express.json())


app.post('/', async (req, res, next) => {
    const url = req.body.url
    let origin
    try {
        origin = new URL(url).origin
    } catch (_) {
        res.send(400).json({msg: 'Invalid URL'})
    }

    const data = await client_info.findOne({where: {
        site_addr: origin
    }})

    if (data) {
        data.data = JSON.parse(data.data)
        res.json(data)
    } else {
        const data = await scraperController(browserPromise, origin)
        if (!data) {
            next(new Error('Not Found'))
        }
        res.send(data)
    }
})


app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})