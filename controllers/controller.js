var data = require('../models/data')

const inventory =  (req, res)=>{
    res.render('inventory', data.data)
}

const stores = (req, res)=>{
    res.render('stores', data.data)
}

const train_model = (req, res)=>{
    res.render('train_model',data.data)
}

const map = (req, res)=>{
    res.render('map', data.location)
}
module.exports={
    inventory,
    stores,
    train_model,
    map
}