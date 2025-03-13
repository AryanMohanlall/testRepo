const DELETE = require("../../api/DELETE");

// DELETE endpoint mock test - Valid Query
test("DELETE test - Valid query", () => {
    const queryDELETE = "DELETE FROM users WHERE age > 25";
    var del = new DELETE();
    const deleteJSON = del.interpret(queryDELETE);

    expect(deleteJSON).not.toBeNull();
    expect(deleteJSON.command).toBe("DELETE");
    expect(deleteJSON.from).toBe("users");
    expect(deleteJSON.conditionField).toBe("age");
    expect(deleteJSON.condition).toBe(">");
    expect(deleteJSON.conditionValue).toBe("25");
});

// DELETE endpoint mock test - Invalid Query (Missing FROM)
test("DELETE2 test - Missing FROM", () => {
    const queryDELETE = "DELETE users WHERE age >= 30";
    var del = new DELETE();
    const deleteJSON = del.interpret(queryDELETE);

    expect(deleteJSON).not.toBeNull();
    expect(deleteJSON.message).toBe("Bad Request: Missing FROM or WHERE clause");
});

// DELETE endpoint mock test - Invalid Query (Missing WHERE)
test("DELETE3 test - Missing WHERE", () => {
    const queryDELETE = "DELETE FROM users";
    var del = new DELETE();
    const deleteJSON = del.interpret(queryDELETE);

    expect(deleteJSON).not.toBeNull();
    expect(deleteJSON.message).toBe("Bad Request: Missing FROM or WHERE clause");
});

// DELETE endpoint mock test - Invalid Conditional
test("DELETE4 test - Invalid condition operator", () => {
    const queryDELETE = "DELETE FROM users WHERE age >> 30";
    var del = new DELETE();
    const deleteJSON = del.interpret(queryDELETE);

    expect(deleteJSON).not.toBeNull();
    expect(deleteJSON.message).toBe("Bad Request: Invalid condition operator");
});

// Optional: Mock setup or teardown if needed
beforeEach(() => {
    // Any setup code, if needed
});

afterEach(() => {
    // Any cleanup code, if needed
});
