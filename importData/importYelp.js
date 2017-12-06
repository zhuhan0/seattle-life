'use strict';
const request = require('request');
const fs = require('fs');
const input = fs.readFileSync('./token.json');
const tokenObj = JSON.parse(input);

const createObj = function(item) {
  let obj = {};
  obj = {
    id: item.id,
    name: item.name,
    phone: item.phone,
    rating: item.rating,
    lat: item.coordinates.latitude,
    lng: item.coordinates.longitude,
    zipcode: item.location.zip_code,
    address: item.location.address1,
    categories: item.categories,
  }
  return obj;
};

// Restaurants(id, name, stars, address, categories, lat, lng)

const yelp = require('yelp-fusion');
const client = yelp.client(tokenObj['access_token']);
let counter = 0;
let output = [];

let operations = []
while (counter < 1000) {
    operations.push(new Promise((resolve, reject) => {
      client.search({
        location: '98101',
        locale: 'en_US',
        radius: 40000,
        categories: 'restaurants, All',
        offset: counter,
        limit: 50,
        sort_by: 'rating'
      }).then(response => {
        let items = response.jsonBody.businesses;
        for (let i = 0; i < items.length; i++) {
          let obj = createObj(items[i]);
          output.push(obj);
        }
        resolve();
      }).catch(e => {
        reject(e);
      });
    }));
    counter += 50;
}

Promise.all(operations).then(() => {
    // All done
    let json = JSON.stringify(output);
    fs.appendFile('restaurants.json', json, 'utf8', null);
});
