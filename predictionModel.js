const bigml = require('bigml')
const db = require('./dataAccess')
const apis = require('./apisAccess')
const key = '84513b26d93b0bfba47412b7bf1fb47bdff8d5be'


var pred = {'city':'AGUR', 'date':'2022-07-01','flavor':'orange'}
var connection = new bigml.BigML('NOAMVAN10', key)
var source = new bigml.Source(connection)

function addDataToPrediction(base){
    var now = new Date(base.Date)
    base.Day = now.toLocaleDateString('en-us', { weekday: 'long' })
    base.Month = now.toLocaleString('default', { month: 'long' })
    let season
    let month = now.getMonth() + 1
    if(month in [11,12,1,2] )
        base.Season = 'winter'
    else if (month in [3,4,5])
        base.Season = 'spring'
    else if(month in [6,7,8])
        base.Season = 'summer'
    else
        base.season = 'autumn'
    
}   

async function train_model(){

    // db.trainingDataToCsv()
    return new Promise((resolve, reject) => {   
        source.create('./Data/Training_data.csv', function(error, sourceInfo) {
            if (!error && sourceInfo) {
                var dataset = new bigml.Dataset(connection);
                dataset.create(sourceInfo, function(error, datasetInfo) {
                    if (!error && datasetInfo) {
                        var model = new bigml.Model(connection);
                        model.create(datasetInfo, function (error, modelInfo) {
                            if (!error && modelInfo) {                               
                                resolve(modelInfo)
                            }
                        }
                        );
                    }
                });
           }
        });
    } )
}

 

async function predict(modelInfo, base_data){
    let cords = await db.getCordsFromCityName(base_data.City)
    base_data.Weather = await apis.getWeather(cords.lng,cords.lat)
    base_data.Holiday = await apis.isThereHolidayNextWeek(base_data.date)
    console.log(base_data)
    return new Promise((resolve, reject) => {
        console.log('predicting')
        var prediction = new bigml.Prediction(connection)
        prediction.create(modelInfo,base_data, function(error, predictInfo){
            resolve(predictInfo)
        } 
        )
    })
}

module.exports = {train_model, predict, addDataToPrediction}


