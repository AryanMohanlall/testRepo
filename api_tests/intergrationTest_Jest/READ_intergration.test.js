const axios = require("axios");

test("Simple read test", async ()=>{
    const res = {    "message": "SELECT statement response",
        "QueryAttributes": {
            "command": "SELECT",
            "attributes": [
                "ID",
                "age",
                "name"
            ],
            "from": "people",
            "conditionField": "",
            "condition": "",
            "conditionValue": ""
        }
    };

    const query = { "query" : "SELECT ID, age, name FROM people"};

    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})

test("Simple read test with WHERE clause",async ()=>{
    const res = {
        "message": "SELECT statement response",
        "QueryAttributes": {
            "command": "SELECT",
            "attributes": [
                "ID",
                "age",
                "name"
            ],
            "from": "people",
            "conditionField": "ACC",
            "condition": "<",
            "conditionValue": "500"
        }
    };

    const query = {"query" : "SELECT ID, age, name FROM people WHERE ACC < 500"};

    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})

test("Simple read test with wildcard",async ()=>{
    const res = {
        "message": "SELECT statement response",
        "QueryAttributes": {
            "command": "SELECT",
            "attributes": [
                "*"
            ],
            "from": "people",
            "conditionField": "ID",
            "condition": "=",
            "conditionValue": "2"
        }
    };
    const query = {"query" : "SELECT * FROM people WHERE ID = 2"};
    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})

test("Read test with missing command",async ()=>{
    const res = {
        "message" : "Bad Request"
    };
    const query = {"query" : "ID, age, name FROM people"};
    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})

test("Read test with missing WHERE clause",async ()=>{
    const res = {
        "message" : "Bad Request"
    };
    const query = {"query" : "SELECT ID, age, name FROM people ACC < 8"};

    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})

test("Read test with missing conditions",async ()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = {"query" : "SELECT ID, age, name FROM people WHERE ACC  8"};

    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})

test("No query",async ()=>{
    const res = {
        "message" : "Bad Request"
    };
    const query = {"query" : ""};

    const response = await axios.post("http://localhost:3000/READ",query);
    expect(response.data).toEqual(res);
})