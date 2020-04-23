const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c51a32c68c1617ed92fd76cfcb78c8d7&query=${latitude},${longitude}`
    request({url: url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to forecast service now', undefined);
        } else if(body.error && body.error.code){
            callback(body.error.info, undefined);
        } else {
            callback(undefined,{
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
                weather_descriptions: body.current.weather_descriptions,
                weather_icons: body.current.weather_icons,
                locationDetails: body.location
            });
        }  
    })
}

module.exports = forecast;