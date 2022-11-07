const redis = require("./redis/Redis")
const data = require("./data")
const redisClient = redis.redisClient;
const parseData = async (data) => {
  let id = "" + data["City"]
  let taste = data["Flavor"]
  let amount = data["Weight"]
  var d = await redisClient.GET(id)
  if(d == null)
    return
  var message = JSON.parse(d);
  var taste_details_store = message;
  try{
  if (taste_details_store[taste] - amount <= 0) {
    taste_details_store[taste] += 20;
  }}
  catch(error){
    console.log('error: ' + message)
  }
  taste_details_store[taste] -= amount;
  await redisClient.SET(id, JSON.stringify(taste_details_store));
}

const getData = async (store) => {
  var data_return = await redisClient.GET(store)
  return JSON.parse(data_return)
}
const total = async () => {
  var taste_details_total = {
    "chocolate": 0, "vanilla": 0, "oreo": 0,
    "strawberry": 0, "berries": 0
  }
  var city = data.data.city
  for (var i = 0; i < 100; i++) {
    var d = await redisClient.GET(city[i])
    d = JSON.parse(d);
    taste_details_total["chocolate"]+=d["chocolate"]
    taste_details_total["vanilla"]+=d["vanilla"]
    taste_details_total["oreo"]+=d["oreo"]
    taste_details_total["strawberry"]+=d["strawberry"]
    taste_details_total["berries"]+=d["berries"]

  }
  console.log(taste_details_total)
  return taste_details_total
}
const restart = async () => {
  const taste_details_store = {
    "chocolate": 20, "vanilla": 20, "oreo": 20,
    "strawberry": 20, "berries": 20
  }
  const taste_details_total = {
    "chocolate": 2000, "vanilla": 2000, "oreo": 2000,
    "strawberry": 2000, "berries": 2000
  }
 
  var city = await data.data.city
  for (var i = 0; i < 100; i++) {
    await redisClient.SET(city[i], JSON.stringify(taste_details_store));
  }
  await redisClient.SET("total_inventory", JSON.stringify(taste_details_total));
}

module.exports = { parseData, getData, restart, total}
