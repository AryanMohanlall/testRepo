const axios = require("axios");

// UPDATE endpoint test - Valid Query
test("UPDATE test - Valid query", async () => {
    const res = {
        "QueryAttributes": {
            "collection": "users",
            "update": { "$set": { age: 30 } },
            "filter": { id: { "$eq": 1 } }
        }
    };

    const query = { "query": "UPDATE users SET age = 30 WHERE id = 1" };

    const response = await axios.put("http://localhost:3000/UPDATE", query);
    expect(response.data).toEqual(res);
});

// UPDATE endpoint test - Missing SET clause
test("UPDATE test - Missing SET", async () => {
    const res = {
        "QueryAttributes": {
            "message": "Bad Request: Missing SET clause"
        }
    };

    const query = { "query": "UPDATE users WHERE id = 1" };

    try {
        const response = await axios.put("http://localhost:3000/UPDATE", query);
        // If no error, compare the response data (not expected in this case)
        expect(response.data).toEqual(res);
    } catch (error) {
        if (error.response) {
            // Catch the error response and log it
            console.error("Error response:", error.response.data);
            // In this case, match the error message, which is likely to be in HTML format
            expect(error.response.data).toContain("Invalid UPDATE syntax: Missing SET or WHERE clause");
        } else {
            console.error("Error occurred:", error);
            throw error; // If no response, throw the error
        }
    }
});

// UPDATE endpoint test - Missing WHERE clause
test("UPDATE test - Missing WHERE", async () => {
    const res = {
        "QueryAttributes": {
            "message": "Bad Request: Missing WHERE clause"
        }
    };

    const query = { "query": "UPDATE users SET age = 30" };

    try {
        const response = await axios.put("http://localhost:3000/UPDATE", query);
        // If no error, compare the response data (not expected in this case)
        expect(response.data).toEqual(res);
    } catch (error) {
        if (error.response) {
            // Catch the error response and log it
            console.error("Error response:", error.response.data);
            // In this case, match the error message, which is likely to be in HTML format
            expect(error.response.data).toContain("Invalid UPDATE syntax: Missing SET or WHERE clause");
        } else {
            console.error("Error occurred:", error);
            throw error; // If no response, throw the error
        }
    }
});

beforeAll(() => {
    console.error = jest.fn();
  });