const { response } = require("express");
const express = require("express");
const app = express();

const https = require("https")

const url = "https://api.openweathermap.org/geo/1.0/direct?q=delhi&limit=1&appid=6b11f61fb89f3046f564e2d89c422261";
var url2 =""
var temp = "";
var description = "";


app.get("/", function(req, res){

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
            console.log(temp + " " + description);
        })
    })

    res.send(`<h1>The temperature in Delhi is: ${temp} °C</h1>`);
})



app.listen(3000, () =>{
    console.log("Server is hosted on port 3000");
})