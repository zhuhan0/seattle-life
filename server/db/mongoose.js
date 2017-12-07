const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://550group:550rocks@ds259255.mlab.com:59255/restaurants-info',
	//mongodb://localhost:27017/Restaurants
	{useMongoClient: true }).then(() => {

	}).catch( (e) => {
		console.log('Failed to connect to db')
	})

module.exports = {mongoose}

