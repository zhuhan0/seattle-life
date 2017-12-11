const {Restaurant} = require('../models/restaurant')
const{mongoose} = require('../mongoose.js')

const findRestaurants = (lat, lng) => {
	return new Promise((resolve, reject) => {
		const restaurants = Restaurant.find({
		lat: {$gt: lat - 0.05, $lt: lat + 0.05},
		lng: {$gt: lng - 0.05, $lt: lng + 0.05}
		// lat: {$gt: 33.6 - 2, $lt: 33.6 + 2},
		// lng: {$gt: -111.9 - 2, $lt: -111.9 + 2},

		// category: {$in: ["Restaurants"]}
	})
		if(restaurants){
			resolve(restaurants)
		}
		else{
			reject('unable to connect restaurants db')
		}
	})
	
}

module.exports = {findRestaurants}