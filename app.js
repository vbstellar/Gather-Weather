const { response } = require("express");
const express = require("express");
const app = express();

const https = require("https")

const url = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=6b11f61fb89f3046f564e2d89c422261";
var url2 =""


app.get("/", function(req, res){

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const degreeData = JSON.parse(data);
            const lat = (parseFloat(degreeData[0].lat).toFixed(2)).toString();
            const lon = parseFloat(degreeData[0].lon).toFixed(2).toString();
            console.log(lat +" " +lon);
            
            url2 = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=6b11f61fb89f3046f564e2d89c422261&units=metric";
        })
    })

    https.get(url2, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            console.log(temp + " " + description);
        })
    })

    res.send("The server is up and running.")
})








app.listen(3000, () =>{
    console.log("Server is hosted on port 3000");
})