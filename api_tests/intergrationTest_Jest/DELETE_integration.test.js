const axios = require("axios");

// DELETE endpoint test - Valid Query
test("DELETE test - Valid query", async () => {
    const res = {
        "QueryAttributes" : {
            "message": "DELETED",
            "command": "DELETE",
            "from": "users",
            "conditionField": "age",
            "condition": ">",
            "conditionValue": "25"
        }
    };

    const query = { "query": "DELETE FROM users WHERE age > 25" };
 
    const response = await axios.post("http://localhost:3000/DELETE", query);
    expect(response.data).toEqual(res);
});

// DELETE endpoint test - Invalid Query (Missing FROM)
test("DELETE2 test - Missing FROM", async () => {
    const res = {
        "QueryAttributes" : {
            "message": "Bad Request: Missing FROM or WHERE clause"
        }
    };

    const query = { "query": "DELETE users WHERE age >= 30" };
 
    const response = await axios.post("http://localhost:3000/DELETE", query);
    expect(response.data).toEqual(res);
});

// DELETE endpoint test - Invalid Query (Missing WHERE)
test("DELETE3 test - Missing WHERE", async () => {
    const res = {
        "QueryAttributes" : {
            "message": "Bad Request: Missing FROM or WHERE clause"
        }
    };

    const query = { "query": "DELETE FROM users" };
 
    const response = await axios.post("http://localhost:3000/DELETE", query);
    expect(response.data).toEqual(res);
});

// DELETE endpoint test - Invalid Conditional
test("DELETE4 test - Invalid condition operator", async () => {
    const res = {
        "QueryAttributes" : {
            "message": "Bad Request: Invalid condition operator"
        }
    };

    const query = { "query": "DELETE FROM users WHERE age >> 30" };
 
    const response = await axios.post("http://localhost:3000/DELETE", query);
    expect(response.data).toEqual(res);
});