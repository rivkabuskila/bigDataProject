const _fetch = require('../controllers/fetchingData.js')
//*************//
//   Arrays   //
//***********//
exports.cities = function cities() { return _fetch.cities() }
exports.holidays = function holidays() { return _fetch.holidays() }



//*************************************//
//   Produce random sales for Kafka   //
//***********************************//

exports.sale = function Sale(citiesArray, holidaysDict) {
    /* Date */
    function today() {
        date = new Date()
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    }
    /* Random City */
    let city_size = Object.keys(citiesArray).length;
    big_cities = ['2', '21', '36', '41', '44', '45', '68', '53', '73', '97', '68']

    function randomCity() {
        let i = Math.floor(Math.random() * 3);  // if 0 or 1 -> big city, if 2 -> small city

        // random a big city
        if (i == 0 || i == 1) {
            let bigCity_index = Math.floor(Math.random() * big_cities.length);
            let bigCity_id = big_cities[bigCity_index]

            return bigCity_id
        }

        let city_id = Math.floor(Math.random() * city_size);
        return city_id

    }
    var _city = randomCity()

    //*******************************************************************************************************************//

    /* Random Flavour */
    var flavour = ['chocolate', 'vanilla', 'oreo', 'strawberry', 'berries']
    function randomFlavour() {
        return Math.floor(Math.random() * 5);
    }
    var _flv = randomFlavour()

    //*******************************************************************************************************************//

    /* Random Weight */
    function randomWeight() {
        kg = Math.floor(Math.random() * 5) + 1;
        return kg
    }
    var _w = randomWeight()


    let randomSale = `{"CityID": "${_city}", "Date": "${today()}", "City": "${citiesArray[_city]}", "Flavor": "${flavour[_flv]}", "Weight": ${_w}}`;
    return randomSale
}