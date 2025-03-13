const UPDATE = require("../../api/UPDATE");  //File location

test("UPDATE should correctly parse valid queries", () =>   //heading
    {
    const queryUPDATE = "UPDATE users SET age = 30 WHERE id = 1";   //Testing query
    const update = new UPDATE();                                    // call function
    const result = update.interpret(queryUPDATE);                   // call function

    expect(result).toEqual(                                         //what you expect
    {
        collection: "users",
        update: { "$set": { age: 30 } },
        filter: { id: { "$eq": 1 } }
    });
});

test("UPDATE should throw an error for missing SET clause", () => { // test wrong case
    const queryUPDATE = "UPDATE users WHERE id = 1";
    const update = new UPDATE();

    expect(() => update.interpret(queryUPDATE)).toThrow();          // see if it throws a error
});
