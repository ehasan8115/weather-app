const express = require("express");
const https=require("https");
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){
    const query=req.body.city;
    const apiKey = "4239351bd935ac12e77a2faad5754d37";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";
    
    https.get(url, function(response) {

        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            // console.log(weatherData);
            // const object ={
            //     name: "Ehasan",
            //     hobby:"Cricket"
            // }
            // console.log(JSON.stringify(object));
            const temp=weatherData.main.temp;
            const weatherDisc=weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the weather in "+query+" is "+weatherDisc+"</p>");
            res.write("<h1>the temperature in "+query+" is "+temp+" degree celcius</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server is started at port 3000");
})