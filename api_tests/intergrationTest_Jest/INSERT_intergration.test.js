const axios = require("axios");

test("Simple insert test",async ()=>{
    const query = {"query" : "INSERT INTO collection (name, age, pet) VALUES (me, 2, dog)"};

    const res = {
        "message": "INSERTED",
        "QueryAttributes": {
            "command": "INSERT",
            "DBname": "collection",
            "fields": [
                "name",
                "age",
                "pet"
            ],
            "values": [
                "me",
                "2",
                "dog"
            ]
        }
    };

        const response = await axios.post("http://localhost:3000/INSERT",query);
        expect(response.data).toEqual(res);
})

test("Simple insert with fields.length != values.length", async ()=>{

    const res = {
        "message": "Bad Request"
    };

    const query = {"query" : "INSERT INTO collection (name, age) VALUES (me, 2, dog)"};

        const response = await axios.post("http://localhost:3000/INSERT",query);
        expect(response.data).toEqual(res);
})

test("No query", async ()=>{

    const res = {
        "message": "Bad Request"
    };

    const query = {"query" : ""};

        const response = await axios.post("http://localhost:3000/INSERT",query);
        expect(response.data).toEqual(res);
})

test("insert without clauses", async ()=>{

    const res = {
        "message": "Bad Request"
    };

    const query = {"query" : "INTO collection (name, age, pet) VALUES (me, 2, dog)"};

        const response = await axios.post("http://localhost:3000/INSERT",query);
        expect(response.data).toEqual(res);
})

test("insert without collection name", async ()=>{

    const res = {
        "message": "Bad Request"
    };

    const query = {"query" : "SELECT INTO (name, age, pet) VALUES (me, 2, dog)"};

        const response = await axios.post("http://localhost:3000/INSERT",query);
        expect(response.data).toEqual(res);
})