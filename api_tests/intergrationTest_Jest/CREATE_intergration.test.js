const axios = require("axios");


test("Simple CREATE call to api",async ()=>{
    const res = {
        "message": "Created DB",
        "QueryAttributes": {
            "command": "CREATE",
            "DBname": "collection1"
        }
    };

    const query = {"query" : "CREATE collection1"};
 
    const response = await axios.post("http://localhost:3000/CREATE",query);
    expect(response.data).toEqual(res);

})

test("Testing with no command", async ()=>{
    const res = {"message" : "Bad Request"};

    const query = {"query" : "collection1"};
 
    const response = await axios.post("http://localhost:3000/CREATE",query);
    expect(response.data).toEqual(res);

});

test("Testing with incorrect input", async ()=>{

    const res = {"message" : "Bad Request"};
    const query = {"query" : "CREATE"};
 
    const response = await axios.post("http://localhost:3000/CREATE",query);
    expect(response.data).toEqual(res);
});

test("Testing with too much input",async ()=>{
    const res = {"message" : "Bad Request"};

    const query = {"query" : "CREATE collection_0 collection_1"};

    const response = await axios.post("http://localhost:3000/CREATE",query);
    expect(response.data).toEqual(res);
});