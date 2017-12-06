var request = require('request');

var id = 'Eojwx_RhMqpf0QdK_cX3rA';
var secret = '270jStWXJ9yOXQUU5XhYKxRE9qSDmsca8k8A6nYIZEJ3L5Oaylwwq8ufs9KftEvo';
var formObj = {
  grant_type: 'client_credentials',
  client_id: id,
  client_secret: secret
};

//Gets the token from Yelp
request.post(
  'https://api.yelp.com/oauth2/token',
  {form: formObj},
  function(err, httpResponse, body){
    var res = JSON.parse(body);
    var json = JSON.stringify(res);
    var fs = require('fs');
    fs.writeFile('token.json', json, 'utf8');
  }
);
