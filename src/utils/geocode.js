const postmanRequest =require('postman-request');
const geocode =(address,callback)=>{

    const url ="http://api.positionstack.com/v1/forward?access_key=dab408d4c09a4e0f60ea906842a17ed1&query="+address+" &limit=1"
   

    postmanRequest({url,json:true},(error,{body})=>{
    
        if(error)
            callback("unable to connect with server",undefined);
        
        else if(body.error)
             callback("unable to find location",undefined);

        else{
            callback(undefined,{
            latitude :body.data[0].latitude,
            longitude :body.data[0].longitude,
            location :body.data[0].label,
            })
        }    
    
    
    })
}

module.exports = geocode