const key = '227597338843241ca962ddaca179fb9e' // open-weather key
const hebHolidays = ['Chanukah day 1','Chanukah day 2','Chanukah day 3','Chanukah day 4','Chanukah day 5','Chanukah day 6','Chanukah day 7','Chanukah day 8','Purim','Erev Pesach','Pesach I','Pesach II','Pesach III','Pesach IV','Pesach VII',"Yom HaAtzma'ut",'Shavuot I','Shavuot II','Erev Rosh Hashana','Rosh Hashana II','Sukkot I','Sukkot II','Sukkot VII (Hoshana Raba)']
function kelvinToWetherValue(temp_in_kelvin){

    let celsius = temp_in_kelvin - 273.15
    
    if (celsius < 10)
        return 'veryCold'
    if (celsius < 25)
        return 'cold'
    if (celsius < 29)
        return 'pleasant'
    if (celsius < 34)
        return 'hot'
    return 'veryHot'

}
async function getWeather(long, lat){

    let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`
    var response =   await fetch(url)
    response = await response.json()
    let weatherState = kelvinToWetherValue(response.list.at(0).main.temp)
    return weatherState
}


Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };
  
  function incrementDays(date, daysNum){
    let currDate = new Date(date)
    let inc = currDate.setDate(currDate.getDate() + daysNum)

    return (new Date(inc)).yyyymmdd()
}

async function isThereHolidayNextWeek(startDate){
    let endDate = incrementDays(startDate,7)
    let url = `https://www.hebcal.com/converter?cfg=json&g2h=1&start=${startDate}&end=${endDate}-12-30&strict=1`
    var hebWeek = await fetch(url)
    hebWeek = await hebWeek.json()

    for (const prop in hebWeek.hdates){
        if(hebWeek.hdates[prop].events.filter(d => hebHolidays.includes(d)).length > 0)
            return true
        
    }
    return false
}



module.exports = {isThereHolidayNextWeek,getWeather}