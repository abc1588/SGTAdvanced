
// add a libraray called express
const express = require('express');  //load the express library into the file

const server = express();

server.use( express.static( __dirname + '/html'));


const insults = [
    'it was the best of time',
    'it was the worst of time',
    'to be or not to be'
];


//the path to listen for
//two args: (1) url to listen for (2) the callback function to call once that path has been received
server.get('/',function(request,response){
    //an object representing all of the data coming from the client to the server
    //an object representing all of the data going from the server to the client
    response.send('Hello, World.')
});

server.get('/time',(request, response)=>{
    var now = new Date();
    response.send( now.toLocalDateString('en-US'))
    //sunrise.toLocaleTimeString('en-US');
});

server.get('/insult',(request, response)=>{
    response.send( insults )
});


///insult

//setup server to listen for a connection - needs two things:
//server.listen(3001, callback_function)
server.listen(3001, ()=> {
    console.log('server is running on port 3001');
    //console.log('server has arrived');
});
















