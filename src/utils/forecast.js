const postmanRequest = require('postman-request')

const forecast = (x,y,callback)=>{

    const url ="http://api.weatherstack.com/current?access_key=91da8faa0ce6f2c38fe182a941cb3afd&query="+x+" "+y+" "
    
    postmanRequest({url, json :true},(err,{ body })=>{   //SHORTHAND SYNTAX URL:URL

        if(err)
        callback("unable to connect with the server",undefined);

        else if(body.error)
        callback("unable to find location..",undefined);

        else{
            console.log(body.current.weather_descriptions);
                callback(undefined,(`${body.location.country} :: ${body.current.weather_descriptions} . it is currently ${body.current.temperature} degrees out .But it feels like ${body.current.feelslike} degrees out `))
           }
    
           
    })
}

module.exports = forecast;