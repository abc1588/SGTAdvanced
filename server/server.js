
// add a libraray called express
const express = require('express');  //load the express library into the file
const mysql = require('mysql');  //load MySql library
const mysqlcredentials = require('./mysqlcreds.js');  //load MySql credentials

//using the credentials loaded, establish a preliminary connection to the database
const db = mysql.createConnection( mysqlcredentials );

const server = express();

server.use( express.static( __dirname + '/html'));
//have express pull body data that is urlencoded and place it into an object called "body"
server.use( express.urlencoded({extended: false}));

server.use(express.json()) //used for things like axios

//*** backend of the full stack ****
//make an endpoint to handle retrieving the grades of all students
//when server port 3001 receives a request for url(/api/grades) - call db.connect function
//connect to db only if /api/grades is requested - test sql cmd in PHPMySQL first
server.get('/api/grades', (req, res) => {
    //establish connection to the database and call the callback function when the connection is made
    db.connect( ()=> {
        //create query for desired database operation
        const query = "select `id`, concat(`givenname`,' ',`surname`) as name, `course`, `grade` from `grades ";
        //send the query to the database, and call the given callback function once the data is retrieved
        // 3 params: (1) error (2) data (3) all fields retrieved
        db.query(query,(error, data)=>{
            //if error is null, no error occurred, create an output object to be sent back to the client
            const output = {
                success: false,
            }
            //if error is null, send the data
            if(!error) {
                //notify the client of success
                output.success = true;
                //attach the data from the database to the output object
                output.data = data;
            } else {
                //an error occurred, attach that error onto the output to see what happened
                output.error = error;
            }
            //send the data back to the client
            res.send(output);
        })
    })
})


// INSERT INTO `grades` SET `givenname`="Dan", `surname`="Paschal",`course`="math", `grade`=80
// INSERT INTO `grades` (`givenname`,`surname`,`course`,`grade`)
//     VALUES ("Dan","Paschal","Math",80)

server.post('/api/grades', (request, response)=> {
    //for testing... response.send( request.body);

    if (request.body.name===undefined || request.body.course===undefined || request.body.grade===undefined) {
        //respond to the client with an appropriate error message
        response.send({
            success: false,
            error: 'invalid name, course, or grade'
        });

        return;
    }

    //connect to the database
    db.connect( ()=> {
        const name = request.body.name.split(" ");

        //const query = 'INSERT INTO `grades` (`givenname`,`surname`,`course`,`grade`,`added`) VALUES (\"Dan\",\"Paschal\",\"Math\",80,NOW()';
        const query = 'INSERT INTO `grades` (`givenname`,`surname`,`course`,`grade`,`added`) VALUES ("' + name[0] + '","' + name[1] + '", "Math",80,NOW())';

        //console.log(query);
        //response.send(query);
        db.query(query, (error, results)=>{
            if (!error){
                response.send({
                    success: true,
                    new_id: result.insertID
                })
            } else {
                response.send ({
                    success: false,
                    error
                })
            }
        })
    })
})



//setup server to listen for a connection - needs two things:
//server.listen(3001, callback_function)
server.listen(3001, ()=> {
    console.log('server is running on port 3001');
    //console.log('server has arrived');
});

// include api because of the path name, followed by callback function (es5 or es6)
// http://localhost:
// server.get('/api/grades', (req, res) => {
//     res.send(`{
//     success: true,
// 	data: [{
// 			id: 10,
// 			name: 'Daniel Paschal',
// 			course: 'Linear Algebra',
// 			grade: 80
// 		},
// 		{
// 			id: 12,
// 			name: 'Sandy Happyfeet',
// 			course: 'Penguin Dancing',
// 			grade: 80
// 		},
// 		{
// 			id: 14,
// 			name: 'Chewie Bacca',
// 			course: 'Porg Roasting',
// 			grade: 89
// 		}
// 	]
//     }`)
// });



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
