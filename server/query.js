var url = 'mongodb://550group:550rocks@ds259255.mlab.com:59255/restaurants-info';
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  var db = database.db('restaurants-info');
  var restaurants = db.collection('restaurants');
  // var query = [
  //   { $group: { _id: "name", count: { $sum: 1} } }
  // ];
  var query = { 'name': 'Zig Zag Cafe' };
  var cursor = restaurants.find(query);
    // Get all the aggregation results
    cursor.each(function(err, docs) {
      console.log(docs);
      if(docs == null) {
        database.close();
      }
    });
});
