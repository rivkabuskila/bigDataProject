const fs = require("fs");
const { parse } = require("csv-parse");
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
var pre = (msg) => {
var value;
switch (msg) {
    case "very low":
        value = 0;
        break;
    case "low":
        value = getRndInteger(1,20);
        break;
    case "moderate":
        value = getRndInteger(20,60);
        break;
    case "high":
        value = getRndInteger(60,120);
        break;
    case "very high":
        value = 120;
        break;
}
return value
}



function getForecas(city, flavor) {
    let forecast = []

        fs.createReadStream("./Data/Training_data.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            if (row[0] == city && row[1] == '03/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[0] = row[5]
            }
            if (row[0] == city && row[1] == '04/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[1] = row[5]
            }
            if (row[0] == city && row[1] == '05/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[2] = row[5]
            }
            if (row[0] == city && row[1] == '06/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[3] = row[5]
            }
            if (row[0] == city && row[1] == '07/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[4] = row[5]
            }
            if (row[0] == city && row[1] == '08/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[5] = row[5]
            }
            if (row[0] == city && row[1] == '09/11/2021' && row[4] == flavor) {
                // console.log(row)
                forecast[6] = row[5]
            }

        })
        .on("error", function (error) {
            console.log(error.message);
        })
        // .on("end", function () {
        //     console.log("finished");
        // });

        for (var i = 0; i < 7; i++){
            forecast[i]= pre(forecast[i]);
        }
        console.log("aa",forecast)
        return forecast
}

// getForecast('ASHDOD', 'vanilla')
// setTimeout(printme, 1000)

// function printme() {
//     console.log(forecast)
// }
function getForecast(city, flavor) {
    let forecast = []
    let value = ['high','low', 'very low','moderate','moderate','moderate','moderate']
    for (let index = 0; index < 7; index++) {
        forecast.push(pre(value[index]))
    }
return(forecast)
}
module.exports = {getForecast}
