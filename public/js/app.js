//console.log("cilent side file is loaded");

   const weatherForm = document.querySelector('form');
   const search = document.querySelector('input');

   const msg1 = document.querySelector("#message1")
   const msg2 = document.querySelector("#message2")
   //msg1.textContent ="first message"
~   weatherForm.addEventListener('submit',(eventObject)=>{

    eventObject.preventDefault();
    const location = search.value;
    console.log(location);
      
    fetch('http://api.weatherstack.com/current?access_key=91da8faa0ce6f2c38fe182a941cb3afd&query= '+location+'').then((response) =>{ 
        response.json().then((data) =>{
            console.log(data);
               if(!data.error){
                 msg2.textContent =" ";
                return msg1.textContent=`Temperatue at ${data.location.name} is around ${data.current.temperature } degree.`;
              // return console.log(`Temperatue at ${data.location.name} is around ${data.current.temperature } degree.`);
               }
           msg1.textContent =" "
           msg2.textContent ="not found, try another";
        })
    
    
    }) 
    

   })
