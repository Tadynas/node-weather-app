const request = require('request')

const forecast = (query, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0181a128d6941a07222e92952457d8c4&query=${query}`

    request({ url, json: true }, (error, response) => {
        if(error) {
            callback({ error: 'Unable to connect to weather service' })
        } else if (response.body.error) {
            callback({ error: 'Unable to find location' })
        } else {
            callback({ location: `${response.body.location.name}, ${response.body.location.country}`, data: `${response.body.current.weather_descriptions[0]}. It's currently ${response.body.current.temperature}C degrees out. There's a ${response.body.current.precip}% chance of rain.` })
        }
    })   
}

module.exports = forecast