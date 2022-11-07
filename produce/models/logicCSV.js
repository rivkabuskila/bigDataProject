const _fetch = require('../controllers/fetchingData.js')
//*************//
//   Arrays   //
//***********//
exports.cities = function cities() { return _fetch.cities() }
exports.holidays = function holidays() { return _fetch.holidays() }



//*************************************//
//   Produce random sales for Kafka   //
//***********************************//

exports.sale = function Sale(citiesDict, holidaysDict) {
    /* Random Date */
    let holiday_size = Object.keys(holidaysDict).length;
    _isHoliday = false
    _weather = ""
    _flag = true
    function randomDate() {
        let kind_of_day = Math.floor(Math.random() * 7); // 0-2: holiday, 3-5: summer, 6: regular


        if (kind_of_day >= 0 && kind_of_day <= 2)  // it's holiday
        {
            let holiday = Math.floor(Math.random() * holiday_size);  // between 0 to 45
            _isHoliday = true
            return holidaysDict[holiday]  // special day
        }

        /*
        if (kind_of_day >= 3 && kind_of_day <= 5)  // it's hot day
        {
            if (Math.floor(Math.random() * 2) == 0) {
                start = new Date(2021, 6, 1)
                end = new Date(2021, 7, 31)
            }
            else {
                start = new Date(2022, 6, 1)
                end = new Date(2022, 7, 31)
            }

            var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        */

        else {
            // regular day
            start = new Date(2021, 0, 1)
            end = new Date(2021, 11, 31)
            var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    }

    var _date = randomDate();

    // find month
    temp = _date
    result = temp.indexOf('-')
    temp = temp.substring(result + 1, temp.length)
    result = temp.indexOf('-')
    temp = temp.substring(0, result)

    var month = parseInt(temp)

    if (month == 12 || month == 11)
        _weather = 'cold'
    else if (month == 10)
        _weather = 'pleasant'
    else if (month == 9)
        _weather = "hot"
    else if (month == 8 || month == 7)
        _weather = 'veryHot'
    else if (month == 6)
        _weather = 'hot'
    else if (month == 5 || month == 4)
        _weather = 'pleasant'
    else if (month == 3)
        _weather = 'cold'
    else if (month == 2 || month == 1)
        _weather = 'veryCold'

    //*******************************************************************************************************************//

    /* Random City */
    let city_size = Object.keys(citiesDict).length;
    big_cities = ['2', '21', '36', '41', '44', '45', '68', '53', '73', '97']

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
    function weight() {

        if (_weather == 'veryHot')
            return 'very high'

        else if (_isHoliday) {
            if (Math.floor(Math.random() * 2) == 0) {
                return 'very high'
            }
            else {
                return "high"
            }
        }
        else {
            if (_weather == 'veryCold')
                return "very low"
            else if (_weather == 'cold')
                return 'low'
            else if (_weather == 'pleasant')
                return 'moderate'
            else if (_weather == 'hot')
                return 'high'
        }

        /*
        kg = Math.floor(Math.random() * 200);

        if (kg < 1)
            return "very low"
        if (kg < 20)
            return "low"
        if (kg < 60)
            return "moderate"
        if (kg < 120)
            return "high"

        return "very high"
        */
    }
    var _w = weight()



    let randomSale = `{"City": "${citiesDict[_city]}", "Date": "${_date}", "Holiday": "${_isHoliday}", "Weather": "${_weather}", "Flavor": "${flavour[_flv]}", "Weight": "${_w}"}`;
    return randomSale
}
