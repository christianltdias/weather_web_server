const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Defining paths fot Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setups handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Christian Dias'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Christian Dias'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Christian Dias'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Christian Dias',
        target: 'public'
    })
})

//app.com/weather -  endpoint
// route need the path 
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address was informed'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'No address was informed'
                })
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })

    })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404: Not Found',
        name: 'Christian Dias',
        error: 'Help artcle not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Not Found',
        name: 'Christian Dias',
        error: 'My 404 page. Weeee! Fuck You!'
    })
})

// Starting the server at the port 3000
app.listen(port, () => {
    console.log('App started running! Port ' + port)
})