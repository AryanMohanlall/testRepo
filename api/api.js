/**
 * @fileoverview API server setup with basic routing and middleware
 */
const express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var CREATE = require("./CREATE.js");
var READ = require("./READ.js");
var DELETE = require("./DELETE.js");
var INSERT = require("./INSERT.js");
var UPDATE = require("./UPDATE.js")

const app = express();
const PORT = 3000;

/**
 * Default route handler for GET requests to the root endpoint.
 * 
 * @route GET /
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The response object.
 */
app.get("/",(req, res)=>{
    res.status(200);
    res.send("Default GET response 69");
})

/**
 * Handles POST requests to create a new database.
 * 
 * @route POST /CREATE
 * @param {express.Request} req - The incoming request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.query - The query string for database creation.
 * @param {express.Response} res - The response object.
 */
app.post("/CREATE",jsonParser,(req,res)=>{
    const query = JSON.stringify(req.body.query);
    var create = new CREATE();
    const StructeredQuery = create.interpret(query);

    if(StructeredQuery.message){
        res.json(StructeredQuery);
        res.status(400);
    }else{
    res.json({"message" : "Created DB","QueryAttributes" : StructeredQuery});
    res.status(201);
    }
    //we will send to daemon like this below using axios
    /*
    axios.post('/daemon/CREATE',StructeredQuery)
    .then(()=>{
        //send response message to FrontEnd
    })
    .catch((error)=>{
        //send error if any
    })*/
    
})

/**
 * Handles POST requests to execute a READ (SELECT) query.
 * 
 * @route POST /READ
 * @param {express.Request} req - The incoming request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.query - The query string for the SELECT statement.
 * @param {express.Response} res - The response object.
 */
app.post("/READ",jsonParser,(req,res)=>{
    const query = JSON.stringify(req.body.query);
    var read = new READ();
    const StructeredQuery = read.interpret(query);

    if(StructeredQuery.message)res.json(StructeredQuery).status(400);
    else{
    res.json({"message" : "SELECT statement response","QueryAttributes" : StructeredQuery});
    }
})



app.put("/UPDATE", jsonParser, (req,res)=>{
    const query = req.body.query;
    var read = new UPDATE();
    const StructeredQuery = read.interpret(query);

    res.json({"QueryAttributes" : StructeredQuery});
})//UPDATE endpoint (temporary for testing)

// // UPDATE endpoint (PUT)
// app.put("/UPDATE", jsonParser, async (req, res) => {
//     try {
//         const query = req.body.query;

//         if (!query) {
//             return res.status(400).json({ "error": "Missing query parameter" });
//         }

//         var update = new UPDATE();
//         const structuredQuery = update.interpret(query);

//         const daemonResponse = await axios.put("http://localhost:5000/daemon/UPDATE", structuredQuery);

//         res.status(200).json({
//             "message": "Update request sent to daemon",
//             "daemonResponse": daemonResponse.data
//         });

//     } catch (error) {
//         console.error("Error in UPDATE endpoint:", error);

//         if (error.response) {
//             res.status(error.response.status).json({
//                 "error": "Daemon error",
//                 "details": error.response.data
//             });
//         } else if (error.request) {
//             res.status(500).json({
//                 "error": "No response from daemon",
//                 "details": "The daemon did not respond to the request."
//             });
//         } else {
//             res.status(500).json({
//                 "error": "Internal server error",
//                 "details": error.message
//             });
//         }
//     }
// });


app.post("/DELETE", jsonParser, (req,res)=>{
    const query = req.body.query;
    var read = new DELETE();
    const StructeredQuery = read.interpret(query);

    res.json({"QueryAttributes" : StructeredQuery});
})//DELETE endpoint

/**
 * Handles POST requests to execute an INSERT query.
 * 
 * @route POST /INSERT
 * @param {express.Request} req - The incoming request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.query - The query string for the INSERT statement.
 * @param {express.Response} res - The response object.
 */
app.post("/INSERT",jsonParser,(req,res)=>{
    //if(!req.body) {res.json({"message" : "Bad Request"}).status(400); return;}

    const query = JSON.stringify(req.body.query);
    var insert = new INSERT();
    const StructeredQuery = insert.interpret(query);

    if(StructeredQuery.message){
        res.json(StructeredQuery).status(400);
    }else{
         res.json({"message" : "INSERTED", "QueryAttributes" : StructeredQuery});
    }
})

/**
 * Handles POST requests for frontend input.
 * 
 * @route POST /FRONTEND
 * @param {express.Request} req - The incoming request object.
 * @param {Object} req.body - The request body.
 * @param {express.Response} res - The response object.
 */
app.post("/FRONTEND",jsonParser,(req,res)=>{
    res.json({"body" : req.body});
})

/**
 * Handles POST requests for user login.
 * 
 * @route POST /LOGIN
 * @param {express.Request} req - The incoming request object.
 * @param {Object} req.body - The request body containing user credentials.
 * @param {string} req.body.username - The username.
 * @param {string} req.body.password - The password.
 * @param {express.Response} res - The response object.
 */
app.post("/LOGIN",()=>{
    if(req.body.username && req.body.password){
        res.json({"body" : req.body});
    }else{
        res.status(400);
        res.json({"message" : "Bad Request"});
    }
})

/**
 * Starts the Express server and listens on the specified port.
 * 
 * @param {number} PORT - The port number on which the server runs.
 * @param {Function} callback - Callback function to handle server startup errors.
 */
app.listen(PORT , (error)=>{
    if(error){
        console.log(error)
    }

    if(!error){
        console.log(`Server is running and listening on PORT : ${PORT}, go to http://localhost:3000/ to view homepage`);
    }
})