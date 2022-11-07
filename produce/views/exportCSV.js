const _fetch = require('../controllers/fetchingData.js')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
    path: '../historySales.csv',
    header: [
        { id: 'City', title: 'City' },
        { id: 'Date', title: 'Date' },
        { id: 'Holiday', title: 'Holiday' },
        { id: 'Weather', title: 'Weather' },
        { id: 'Flavor', title: 'Flavor' },
        { id: 'Weight', title: 'Weight'}
    ]
})
//*************//
//   Arrays   //
//***********//
const create = require('../models/logicCSV.js');
exports.cities = function cities() { return _fetch.cities() }
exports.holidays = function holidays() { return _fetch.holidays() }

let cities = create.cities()
let holidays = create.holidays()
setTimeout(exportToCSV, 1000)

function exportToCSV() {
    let csvContent = []

    for (let i = 0; i < 5000; i++) {
        var _sale = JSON.parse(create.sale(cities, holidays))
        csvContent.push(_sale)
    }

    csvWriter.writeRecords(csvContent)
            .then(() => {
                console.log('Done')
            })
    
}