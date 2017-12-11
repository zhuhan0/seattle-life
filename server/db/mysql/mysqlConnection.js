const mysql = require("mysql")

const findHouses = (lat, lng, floorplan, isRent) => {
	return new Promise((resolve, reject) => {
		const con = mysql.createConnection({
		host: "seattle-housing.cx6oha6hvscj.us-east-2.rds.amazonaws.com",
		port: "3306",
		database: "seattle_housing",
		user: "cis550",
		password: "550project"
		})
		let houseTransaction = "Rent"
		if(isRent === 'false'){
			houseTransaction = "Sale"
		}

		let queryStatement = `
			SELECT * 
			FROM House
			JOIN ${houseTransaction}
			ON House.id = ${houseTransaction}.id
			WHERE House.lat BETWEEN ${lat - 0.05} AND ${lat + 0.05}
			AND House.lng BETWEEN ${lng - 0.05} AND ${lng + 0.05}
			AND House.floorplan = ${floorplan}
		`

		con.query(queryStatement, (err, response) => {
		if(err){
			reject("can't connect to house db")
		}
		else{
			resolve(response)
			con.end()
		}
		})
	})
}

const findUtilities = (lat, lng) => {
	return new Promise((resolve, reject) => {
		const con = mysql.createConnection({
		host: "seattle-housing.cx6oha6hvscj.us-east-2.rds.amazonaws.com",
		port: "3306",
		database: "seattle_housing",
		user: "cis550",
		password: "550project"
		})

		let queryStatement = `
			SELECT * 
			FROM Utility
			WHERE lat BETWEEN ${lat - 0.05} AND ${lat + 0.05}
			AND lng BETWEEN ${lng - 0.05} AND ${lng + 0.05}
		`

		con.query(queryStatement, (err, response) => {
		if(err){
			reject("can't connect to utility db")
		}
		else{
			resolve(response)
			con.end()
		}
		})
	})
}

const findCrimes = (lat, lng) => {
	return new Promise((resolve, reject) => {
		const con = mysql.createConnection({
		host: "seattle-housing.cx6oha6hvscj.us-east-2.rds.amazonaws.com",
		port: "3306",
		database: "seattle_housing",
		user: "cis550",
		password: "550project"
		})

		let queryStatement = `
			SELECT * 
			FROM Crime
			WHERE lat BETWEEN ${lat - 0.05} AND ${lat + 0.05}
			AND lng BETWEEN ${lng - 0.05} AND ${lng + 0.05}
			AND timing >= '2017-11-05'
		`

		con.query(queryStatement, (err, response) => {
		if(err){
			reject("can't connect to crime db")
		}
		else{
			resolve(response)
			con.end()
		}
		})
	})
}

module.exports = {findHouses, findUtilities, findCrimes}