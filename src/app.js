const geocode=require('./utils/geocode');
const forecast=require("./utils/forecast");
const path =require('path');

const express = require('express');
const hbs =require('hbs');
const { runInNewContext } = require('vm');

const app = express();
  
// console.log(__filename);

// DEFINE PATHS FOR EXPRESS CONFIG
const staticFiles = (path.join(__dirname,'../public'));
const viewFiles = (path.join(__dirname,'../src/templates/views'))
const partialFiles=(path.join(__dirname,'../src/templates/partials'));
console.log(path.join(__dirname,'../src/templates/partials'));
// SETUP STATIC DIRECTORY 
app.use(express.static(staticFiles));


//SETUP HANDLERS ENGINE AND VIEWS LOCATION
app.set('view engine','hbs');
app.set('views',viewFiles);
hbs.registerPartials(partialFiles);

 
app.get('',(req,res) =>{
  res.render('index', {
    title :"Weather App",
    author : "Created By Mujeeb"
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title :"About Us",
        author : "Created by Mujeeb"
    })
})
app.get('/help', (req, res) => {
    res.render("help",{
        title: 'help Me', 
        paragraph : "feel free to ask for anything",
        author : "Created by Mujeeb"
    })
        })

// app.get('/about', (req, res) => {
//     res.send('about.html')
// })

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
         return res.send({
            error: "you must provide an address,try another address"})
    }
    //   let latitude = ""
    //   let longitude =" "
    //   let location =" "
     geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
     if(error)
         return res.send({error})
    
       forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return res.send({error})
          }
          else
          {
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
          }
        })

       })
    })

    
    // res.send({
    //     address : req.query.address,
    //     forcast : "cloudy"
    //   })

    

app.get('/help/*', (req, res) => {
    res.render("404",{
        title: '404', 
        paragraph : "Help Article Not Found,check your url",
        author : "Created by Mujeeb"
    })
        })


app.get('/products',(req,res) =>{
    if(!req.query.search){

      return res.send({
        error : "you must include serach option"
       })
    }

   res.send({
    product : "laptop"
   })
})

app.get('*',(req,res)=>{
     res.render("404",{
        title : 404,
        paragraph : "404 : Page Not Found",
     });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})