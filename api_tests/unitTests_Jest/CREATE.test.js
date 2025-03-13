const CREATE = require("../../api/CREATE");

test("Simple CREATE test",()=>{
    const res = {
        "command" : "CREATE",
        "DBname" : "collection_1"
    };

    const query = "CREATE collection_1";

    var create = new CREATE();

    expect(create.interpret(query)).toEqual(res);
});

test("Testing with no command",()=>{
    const res = {"message" : "Bad Request"};

    const query = "collection_0";
    var create = new CREATE();

    expect(create.interpret(query)).toEqual(res);

});

test("Testing with incorrect input",()=>{
    const res = {"message" : "Bad Request"};

    const query = "CREATE";
    var create = new CREATE();

    expect(create.interpret(query)).toEqual(res);
});

test("Testing with too much input",()=>{
    const res = {"message" : "Bad Request"};

    const query = "CREATE collection_0 collection_1";
    var create = new CREATE();

    expect(create.interpret(query)).toEqual(res);
});