
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var apis = require('./apisAccess')
const url = `mongodb+srv://tna101:tna101@project.praubgf.mongodb.net/?retryWrites=true&w=majority`;
const delay = ms => new Promise(res => setTimeout(res, ms));

const sqlCon = mysql.createConnection({
  host: "sql7.freemysqlhosting.net",
  user: "sql7530153",
  password: "FbANyHrpCD",
  database: "sql7530153"
});

async function addToMongoDb(sale){
  const uri = `mongodb+srv://tna101:tna101@project.praubgf.mongodb.net/?retryWrites=true&w=majority`;
  const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

  try {
      await client.connect();
      let col = client.db('sales').collection('trasactions')
      await col.insertOne(sale)
      console.log('inserted 1 document to mongo')
  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}
function asyncQuery(query,con) {
  return new Promise((resolve, reject) =>{
      con.query(query, (err, result) => {
          if (err)
              return reject(err);
          resolve(result);
      });
  });
}

async function getCordsFromCityName(city, connection = false){
  console.log(city)
  let sql =`SELECT lat,lng FROM Cities where city_name = '${city}'`
  let results = await asyncQuery(sql, sqlCon)

  return results[0]
}

async function addSatelliteData(docs){

  let con = mysql.createConnection({
    host: "sql7.freemysqlhosting.net",
    user: "sql7530153",
    password: "FbANyHrpCD",
    database: "sql7530153"
  });
  for(let i =0; i < docs.length; i++){
    let sql = `Select * from Cities where city_name= '${docs[i].city}'`
    let res = (await asyncQuery(sql,con))[0]
    docs[i].age_0_5 = await res.age_0_5
    docs[i].age_6_18 = res.age_6_18
    docs[i].age_19_45 = res.age_19_45
    docs[i].age_46_55 = res.age_46_55
    docs[i].age_56_64 = res.age_56_64
    docs[i]['age_65+'] = res['age_65+']
    docs[i].total_citizens = res.total_citizens
    docs[i].size = res.size + ' (בסולם 1-8) '
    docs[i].amount = docs[i].weight
    delete docs[i]._id   
    delete docs[i].weight
  }
  // console.log(docs)
  con.end()
}


 function trainingDataToCsv(){
  const fs = require("fs");
  const ws = fs.createWriteStream("Training_Data.csv");
  const fastcsv = require("fast-csv");
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db("sales")
      .collection("PastSales")
      .find({})
      .toArray(async (err, data) => {
        if (err) throw err;
        // await addSatelliteData(data)
        // console.log(data)
        fastcsv
        .write(data, { headers: true })
        .on("finish", function() {
          
        })
        .pipe(ws);

        client.close();
      });
  }
);
}

async function eltFlow(sale){
  if(sale == null || sale.hasOwnProperty('chocolate'))
    return
  let cords = await getCordsFromCityName(sale.City)
  sale.Weather = await apis.getWeather(cords.lng,cords.lat)
  sale.Holiday = await apis.isThereHolidayNextWeek(sale.date)
  await addToMongoDb(sale)
}
module.exports = {getCordsFromCityName, trainingDataToCsv, addToMongoDb, eltFlow}
