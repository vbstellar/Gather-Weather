const express = require("express");
const app = express();

const https = require("https")

const url = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=6b11f61fb89f3046f564e2d89c422261";


app.get("/", function(req, res){

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            console.log(weatherData);
        })
    })
    res.send("The server is up and running.")
})








app.listen(3000, () =>{
    console.log("Server is hosted on port 3000");
})