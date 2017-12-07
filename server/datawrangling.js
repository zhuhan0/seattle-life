const{mongoose} = require('./db/mongoose.js')

let{Restaurant} = require('./db/models/restaurant.js')

var fs = require('fs');
var stream = fs.createReadStream('./db/business.json', {flags: 'r', encoding: 'utf-8'});
var buf = '';
let cnt = 0
stream.on('data', function(d) {
    buf += d.toString(); // when data is read, stash it in a string buffer
    pump(); // then process the buffer
});

function pump() {
    var pos;

    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
        if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
            buf = buf.slice(1); // discard it
            continue; // so that the next iteration will start with data
        }
        processLine(buf.slice(0,pos)); // hand off the line
        buf = buf.slice(pos+1); // and slice the processed data off the buffer
    }
}

function processLine(line) { // here's where we do something with a line
	
    if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)

    if (line.length > 0) { // ignore empty lines
        var obj = JSON.parse(line); // parse the JSON
        // if(obj.name && obj.address && obj['postal code'] && obj.latitude && obj.longitude && obj.stars && obj.categories){
        	let r = new Restaurant({
        	name: obj.name,
        	address: obj.address,
        	postcode: obj['postal code'],
        	lat: obj.latitude,
        	lng: obj.longitude,
        	star: obj.stars,
        	category: obj.categories
        	})
        	r.save().then( () => {

        	}).catch((e)=>{
                console.log('failed to save')
        	})
        // }
        cnt++
        console.log(cnt); // do something with the data here!
    }
}