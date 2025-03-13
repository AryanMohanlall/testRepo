module.exports = class UPDATE {
    constructor() {
        this.collection = ""; // NoSQL uses "collection"
        this.filter = {}; // Condition { "id": 1 }
        this.update = { "$set": {} }; // Updates
    }

    interpret(query) {
        if (typeof query !== "string" || !query.trim()) {
            throw new Error("Invalid query: Query must be a non-empty string.");
        }

        let argumentsArr = query.split(" ").filter(word => word.trim() !== ""); // Split and remove empty strings
        this.collection = argumentsArr[1]; // Collection (table equivalent)

        let setIndex = argumentsArr.indexOf("SET");
        let whereIndex = argumentsArr.indexOf("WHERE");

        if (setIndex === -1 || whereIndex === -1) {
            throw new Error("Invalid UPDATE syntax: Missing SET or WHERE clause.");
        }

        // Extract updates (SET field1 = value1, field2 = value2)
        let updateParts = argumentsArr.slice(setIndex + 1, whereIndex).join(" ").split(",");
        for (let update of updateParts) {
            let match = update.trim().match(/^(.+?)\s*=\s*(.+)$/);
            if (!match) {
                throw new Error(`Invalid UPDATE syntax: Malformed SET clause: ${update}`);
            }
            let [, key, value] = match;
            this.update["$set"][key] = isNaN(value) ? value.replace(/['"]/g, "") : Number(value);
        }

        // Extract WHERE condition
        let whereClause = argumentsArr.slice(whereIndex + 1).join(" ");
        let conditions = whereClause.toUpperCase().split("AND").map(cond => cond.trim());

        const operatorMapping = { "=": "$eq", ">": "$gt", "<": "$lt", ">=": "$gte", "<=": "$lte" };

        for (let condition of conditions) {
            let match = condition.match(/^(.+?)\s*(=|>|<|>=|<=)\s*(.+)$/);
            if (!match) {
                throw new Error(`Invalid UPDATE syntax: Malformed WHERE clause: ${condition}`);
            }
            let [, field, operator, value] = match;

            value = isNaN(value) ? value.replace(/['"]/g, "") : Number(value);

            if (operator in operatorMapping) {
                this.filter[field.toLowerCase()] = { [operatorMapping[operator]]: value };
            } else {
                throw new Error(`Invalid UPDATE syntax: Unsupported operator in WHERE clause: ${operator}`);
            }
        }

        return {
            "collection": this.collection,
            "filter": this.filter,
            "update": this.update
        };
    }
};