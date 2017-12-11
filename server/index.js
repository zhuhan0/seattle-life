const{mongoose} = require('./db/mongoose.js')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333
const {Restaurant} = require('./db/models/restaurant')
const mysql = require("mysql")
const {findHouses, findUtilities, findCrimes} = require('./db/mysql/mysqlConnection.js')
const {findRestaurants} = require('./db/nosql/mongoConnection')




app.get('/', (req, res) => {
	res.send("welcom to the app")
})

app.get('/:lat/:lng/:floorplan/:isRent', async (req, res) => {
	let lat = parseFloat(req.params.lat)
	let lng = parseFloat(req.params.lng)
	let floorplan = req.params.floorplan
	let isRent = req.params.isRent

	let houses = await findHouses(lat, lng, floorplan, isRent)
	let restaurants = await findRestaurants(lat, lng)
	let utilities = await findUtilities(lat, lng)
	let crimes = await findCrimes(lat, lng)

	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	
	res.send({crimes, houses, utilities, restaurants})
})



app.listen(PORT)
