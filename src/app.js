const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Modules
const forecast = require('../utils/forecast')

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ted Greek'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    forecast(req.query.address, ({ data, location, error }) => {
        if(error) {
            return res.send({ error })
        }

        return res.send({
            forecast: data,
            location,
            address: req.query.address
        })

        
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})