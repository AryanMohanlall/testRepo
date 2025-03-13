const INSERT = require("../../api/INSERT");

test("Simple insert test",()=>{
    const res = {
        "command" : "INSERT",
        "DBname" : "collection",
        "fields" : ["name", "age", "pet"],
        "values" : ["me","2","dog"]
    };

    const query = "INSERT INTO collection (name, age, pet) VALUES (me, 2, dog)";

    var insert = new INSERT();
    expect(insert.interpret(query)).toEqual(res);
});

test("Simple insert with fields.length != values.length",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = "INSERT INTO collection (name, age) VALUES (me, 2, dog)";

    var insert = new INSERT();
    expect(insert.interpret(query)).toEqual(res);
});

test("No query",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = "";

    var insert = new INSERT();
    expect(insert.interpret(query)).toEqual(res);
});

test("insert without clauses",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = " INTO collection (name, age, pet) VALUES (me, 2, dog)";

    var insert = new INSERT();
    expect(insert.interpret(query)).toEqual(res);
});

test("insert without clauses",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = "SELECT INTO collection (name, age, pet) VALUES (me, 2, dog)";

    var insert = new INSERT();
    expect(insert.interpret(query)).toEqual(res);
});

test("insert without collection name",()=>{
    const res = {
        "message" : "Bad Request"
    };

    const query = "SELECT INTO (name, age, pet) VALUES (me, 2, dog)";

    var insert = new INSERT();
    expect(insert.interpret(query)).toEqual(res);
});