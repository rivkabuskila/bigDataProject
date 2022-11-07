const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const db = require('./dataAccess')
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')))
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const data = require('./models/dataSet')
const pre = require('./predictionModel')
var model
var weakData = require("./models/weekly_forecast")


const port = process.env.PORT || 3000;
require('events').EventEmitter.defaultMaxListeners = 100;

//router
const router = require('./routes/router.js')
app.use(router)
data.restart();

let id="";
let w=[];
// Kafka
const kafka = require('./kafka/consume');
const ms = require('ms')
kafka.on("data", async function(m) {
  const message = JSON.parse(m.value);
  db.eltFlow(message)
  console.log(`got message from kafka:${JSON.stringify(message)}`);
  await data.parseData(message);
  var total_inventory =  await data.total()
  io.emit("total_inventory", total_inventory);
  io.on("connection", async function(socket) {
    //get info of store
    socket.on("store",async function (msg) {
      id = msg.City
      const store_inventory = await data.getData(msg.City)
      var store_data_dash = {}
      store_data_dash.store = store_inventory;
      w = weakData.getForecast(msg.City, msg.Flavor)
      store_data_dash.week = w
      socket.emit("store_inventory",store_data_dash);
    });
    // get total inventory
    socket.on("load_information",async function () {
      var total_inventory =  await data.total()
      socket.emit("total_inventory",total_inventory);
    });

  }); 
  if (id != ""){
    const store_inventory =  await data.getData(id);
    var store_data_dash = {}
    store_data_dash.store = store_inventory;
    store_data_dash.week = w
    io.emit("store_inventory",store_data_dash )
  }

});
kafka.connect();
io.on("connection", async function(socket) {
socket.on("train model",async function () {
        model = await pre.train_model();
        console.log("train model")
        
 });
 socket.on("pre",async function (prediction_base) {
  console.log(model)
  var prediction = await pre.predict(model,prediction_base)
  delete prediction.City
  var response = {'Date':prediction_base.Date}
  pre.addDataToPrediction(response)
  response.consumption = prediction.object.output
  response.confidence = prediction.object.confidence
  console.log("prediction done \n" + response)
  console.log(prediction)
  io.emit("prediction_res",response)
});
});

server.listen(port, () => {
    console.log("server running in port " + port);
  });
  

  