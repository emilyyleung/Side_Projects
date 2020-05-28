console.log("Hello from the server");

var express = require ('express');
var app = express();

function listening() {
    console.log("listening")
}

app.use(express.static('pineapple'))
var server = app.listen(3000, listening);