const{mongoose} = require('./db/mongoose.js')

let{Restaurant} = require('./db/models/restaurant.js')

var fs = require('fs');
const input = fs.readFileSync('./restaurants.json');
const objs = JSON.parse(input);
console.log(objs.length);

for (let i = 0; i < objs.length; i++) {
  let obj = objs[i];
  let r = new Restaurant({
    name: obj.name,
    address: obj.address,
    postcode: obj.zipcode,
    lat: obj.lat,
    lng: obj.lng,
    star: obj.rating,
    category: obj.categories
  })
  r.save().then( () => {

  }).catch((e)=>{
      console.log('failed to save')
  })
}
console.log('finished')
