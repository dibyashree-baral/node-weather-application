const request = require('request');

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGlieWFzaHJlZSIsImEiOiJjazh5ZWJlMm0wMWRjM2htdHowY21yZTc5In0.1L6XPZ7wJh10Xjnek1Wfhg&limit=1`
    request({url,json:true},(error,{body:{features}})=>{
        if(error){
            callback('Unable to connect to geocode service now', undefined);
        } else if(features && features.length === 0){
            callback('bad request', undefined);
        } else {
            callback(undefined,{
                longitude: features[0].center[0],
                latitude: features[0].center[1]
            });
        }  
    })
}

module.exports = geocode;