//*****************************//
//   Initialize the arrays    //
//***************************//
var mysql = require('mysql');

exports.cities = function fetch_cities() {
    var citiesDict = {}
    let i = 0

    var con = mysql.createConnection({
    host: "sql7.freemysqlhosting.net",
    user: "sql7530153",
    password: "FbANyHrpCD",
    database: "sql7530153"
    })
    con.connect(function (err){
        if (err) throw err;
        con.query(`SELECT city_name FROM Cities`, function (err, result, fields) {
            if (err) throw err;
            result.forEach(
                element => {
                    citiesDict[i] = element.city_name
                    i++ })
        });
    })
    return citiesDict
}


exports.holidays = function fetch_holidays(){
    let holidays_url = 'https://holidayapi.com/v1/holidays?pretty&key=6494e84f-c91d-4794-bbf1-abd52c1d760d&country=IL&year=2021'
    var holidaysArray = {}
    let i=0
    // fetch the holidays:
    fetch(holidays_url)
    .then(res => { return res.json() })
    .then(data => { return data.holidays })
    .then(city => city.forEach(
        element => {
            holidaysArray[i] = element.date
            i++
        }
    ))

    return holidaysArray
}
