const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ccbd330e899b666f2976c1d35e2d642b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {

            callback(undefined, {
                text: 'Today is ' + body.current.weather_descriptions[0] +
                    '. Temperature is ' + body.current.temperature + '°C and feelslike ' +
                    body.current.feelslike + '°C. With a ' + body.current.precip + '% of rain.',
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                precip: body.current.precip,
                descriptions: body.current.weather_descriptions
            })

        }
    })
}

module.exports = forecast