const mongoose = require('mongoose')

let Restaurant = mongoose.model('Restaurant', {
	address: {
		type: String,
		require: true,
		minlength: 1,
		trim: true
	},

	name: {
		type: String,
		require: true,
		minlength: 1,
		trim: true

	},

	postcode:{
		type:String,
		trim: true
	},

	lat:{
		type: Number
	},
	lng:{
		type: Number
	},

	star:{
		type: Number
	},

	category: {
		type: []
	}
	})

module.exports = {Restaurant}
