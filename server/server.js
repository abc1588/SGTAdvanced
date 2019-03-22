
// add a libraray called express
const express = require('express');  //load the express library into the file
const mysql = require('mysql');  //load MySql
const mysqlcredentials = require('./mysqlcreds.js');  //load MySql

const db = mysql.createConnection( mysqlcredentials );

const server = express();

server.use( express.static( __dirname + '/html'));

//when server port 3001 receives a request for url(/api/grades) - call db.connect function
//connect to db only if /api/grades is requested - test sql cmd in PHPMySQL first
server.get('/api/grades', (req, res) => {
    db.connect( ()=> {
        const query = "select `id`, concat(`givenname`,' ',`surname`) as name, `course`, `grade` from `grades ";
        // 3 params: (1) error (2) data (3) all fields retrieved
        db.query(query,(error, data)=>{
            const output = {
                success: false,
            }
            if(!error) {
                output.success = true;
                output.data = data;
            } else {
                output.error = error;
                }
                res.send(output);
        })
    })
})

// include api because of the path name, followed by callback function (es5 or es6)
// http://localhost:
server.get('/api/grades', (req, res) => {
    res.send(`{
    success: true,
	data: [{
			id: 10,
			name: 'Daniel Paschal',
			course: 'Linear Algebra',
			grade: 80
		},
		{
			id: 12,
			name: 'Sandy Happyfeet',
			course: 'Penguin Dancing',
			grade: 80
		},
		{
			id: 14,
			name: 'Chewie Bacca',
			course: 'Porg Roasting',
			grade: 89
		}
	]    
    }`)
});

//setup server to listen for a connection - needs two things:
//server.listen(3001, callback_function)
server.listen(3001, ()=> {
    console.log('server is running on port 3001');
    //console.log('server has arrived');
});


// //the path to listen for
// //two args: (1) url to listen for (2) the callback function to call once that path has been received
// server.get('/',function(request,response){
//     //an object representing all of the data coming from the client to the server
//     //an object representing all of the data going from the server to the client
//     response.send('Hello, World.')
// });
//
// server.get('/time',(request, response)=>{
//     var now = new Date();
//     response.send( now.toLocalDateString('en-US'))
//     //sunrise.toLocaleTimeString('en-US');
// });
//
// server.get('/insult',(request, response)=>{
//     response.send( insults )
// });
//
//
// ///insult
//
// //setup server to listen for a connection - needs two things:
// //server.listen(3001, callback_function)
// server.listen(3001, ()=> {
//     console.log('server is running on port 3001');
//     //console.log('server has arrived');
// });
//















