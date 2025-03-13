const READ = require("../../api/READ");

test("Simple read test",()=>{
    const res = {
        "command" : "SELECT",
        "attributes" : ["ID","age","name"],
        "from" : "people",
        "conditionField" : "",
        "condition" : "",
        "conditionValue" : ""
    };

    const query = "SELECT ID, age, name FROM people";

    var read = new READ();
    
    expect(read.interpret(query)).toEqual(res);
});

test("Simple read test with WHERE clause",()=>{
    const res = {
        "command" : "SELECT",
        "attributes" : ["ID","age","name"],
        "from" : "people",
        "conditionField" : "ACC",
        "condition" : "<",
        "conditionValue" : "500"
    };

    const query = "SELECT ID, age, name FROM people WHERE ACC < 500";

    var read = new READ();
    
    expect(read.interpret(query)).toEqual(res);
});

test("Simple read test with wildcard",()=>{
    const res = {
        "command" : "SELECT",
        "attributes" : ["*"],
        "from" : "people",
        "conditionField" : "ID",
        "condition" : "=",
        "conditionValue" : "2"
    };

    const query = "SELECT * FROM people WHERE ID = 2";

    var read = new READ();
    
    expect(read.interpret(query)).toEqual(res);
});

test("Read test with missing command",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = " ID, age, name FROM people";

    var read = new READ();
    
    expect(read.interpret(query)).toEqual(res);
});

test("Read test with missing WHERE clause",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = "SELECT ID, age, name FROM people ACC < 8";

    var read = new READ();
    
    expect(read.interpret(query)).toEqual(res);
});

test("Read test with missing conditions",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = "SELECT ID, age, name FROM people WHERE ACC  8";

    var read = new READ();
    
    expect(read.interpret(query)).toEqual(res);
});

test("No query",()=>{
    const res = {"message" : "Bad Request"};
    const query = "";

    var read = new READ();
    expect(read.interpret(query)).toEqual(res);
});

