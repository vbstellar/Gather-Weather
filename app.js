const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const https = require("https")

app.use(bodyParser.urlencoded({extended: true}));


var url2 =""
var temp = "";
var description = "";
var icon = "";


app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req, res){
    const City = req.body.cityName;
    const api = "use your own by heading onto: openweathermap.org"
    const url = "https://api.openweathermap.org/geo/1.0/direct?q="+City+"&limit=1&appid="+api;
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const degreeData = JSON.parse(data);
        var lat = (parseFloat(degreeData[0].lat).toFixed(2)).toString();
        var lon = parseFloat(degreeData[0].lon).toFixed(2).toString();
        console.log(lat +" " +lon);
        
        url2 = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=6b11f61fb89f3046f564e2d89c422261&units=metric";
    })
    })
    
https.get(url2, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);

        temp = weatherData.main.temp;
        description = weatherData.weather[0].description;
        icon = weatherData.weather[0].icon;

        console.log(temp + " " + description);
    })
})

imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

res.write(`<h1>The temperature in ${City} is: ${temp} °C</h1>`);
res.write(`<p>The Weather is ${description} currently.</p>`);
res.write("<img src="+imageUrl+">")
res.send;

})





app.listen(3000, () =>{
    console.log("Server is hosted on port 3000");
})
