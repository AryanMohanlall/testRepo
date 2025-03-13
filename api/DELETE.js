/**
 * Class representing a DELETE query interpreter.
 */
module.exports = class DELETE {
    /**
     * Creates an instance of the DELETE class.
     */
    constructor() {
        /** 
         * The command, always "DELETE".
         * @type {string}
         */
        this.command = ""; 
        
        /** 
         * The name of the table from which to delete.
         * @type {string}
         */
        this.from = ""; 
        
        /** 
         * The column to use for the condition (e.g., "age").
         * @type {string}
         */
        this.conditionField = ""; 
        
        /** 
         * The condition operator (e.g., "=", ">", etc.).
         * @type {string}
         */
        this.condition = ""; 
        
        /** 
         * The value to compare in the condition.
         * @type {string}
         */
        this.conditionValue = ""; 
    }

    /**
     * Interprets a DELETE query and returns a JSON object with details.
     * @param {string} query - The DELETE query to interpret.
     * @returns {Object} The parsed query as a JSON object, or a message if invalid.
     */
    interpret(query) {
        // Split the query by spaces into an array of arguments
        var argumentsArr = query.split(" ");
        
        // If the query is invalid or does not start with "DELETE", return an error
        if (argumentsArr.length < 3 || argumentsArr[0] !== "DELETE") {
            return { message: "Bad Request: Invalid DELETE query" };
        }

        this.command = argumentsArr[0];

        // Locate the index of "FROM" and "WHERE" clauses in the query
        let fromIndex = argumentsArr.indexOf("FROM");
        let whereIndex = argumentsArr.indexOf("WHERE");
        
        // Check if the query has missing "FROM" or "WHERE" clauses or insufficient arguments
        if (fromIndex === -1 || whereIndex === -1 || fromIndex + 1 >= argumentsArr.length || whereIndex + 2 >= argumentsArr.length) {
            return { message: "Bad Request: Missing FROM or WHERE clause" };
        }

        // Set the table name (from) and the condition field (e.g., "age")
        this.from = argumentsArr[fromIndex + 1];
        this.conditionField = argumentsArr[whereIndex + 1];

        // Set the operator and condition value from the WHERE clause
        let operatorIndex = whereIndex + 2;
        
        // Define valid operators for the condition
        let validOperators = ["=", "<", ">", "<=", ">=", "!="];

        // Check if the operator is valid
        if (!validOperators.includes(argumentsArr[operatorIndex])) {
            return { message: "Bad Request: Invalid condition operator" };
        }

        // Set the condition and condition value
        this.condition = argumentsArr[operatorIndex];
        this.conditionValue = argumentsArr[operatorIndex + 1];

        // Return a JSON object with the parsed query information
        return {
            "message": "DELETED",
            "command": this.command,
            "from": this.from,
            "conditionField": this.conditionField,
            "condition": this.condition,
            "conditionValue": this.conditionValue
        };
    }
};