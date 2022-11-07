const express= require('express')
const router = express.Router()
const {inventory, stores, train_model, map} = require('../controllers/controller')

router.get('/', map)
router.get('/inventory', inventory)
router.get('/stores', stores)
router.get('/train_model', train_model)
router.get('/map', map)





module.exports = router
