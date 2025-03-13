module.exports = class READ{
    /**
     * Sets attributes of CREATE class
     * @constructor
     */
    constructor(){
        this.command = "";
        this.attributes = [];
        this.from = "";
        this.conditionField = "";
        this.condition = ""; 
        this.conditionValue = "";
    }

    /**
     * 
     * @param {string} query - SQL statement
     * @returns {JSON}  JSON object of SQL attributes
     */
    interpret(query){
        var arguementsArr = query.split(" ");
        var collectNow = false;

        if(query === "") return {"message" : "Bad Request"};

        for(var i=0;i<arguementsArr.length;i++){
            arguementsArr[i] = arguementsArr[i].replace("(","");
            arguementsArr[i] = arguementsArr[i].replace(",","");
            arguementsArr[i] = arguementsArr[i].replace(")","");
            arguementsArr[i] = arguementsArr[i].replace(";","");
            arguementsArr[i] = arguementsArr[i].replace("\"","");
        }

        if(arguementsArr[0] !== "SELECT") return {"message" : "Bad Request"};

        if(arguementsArr.indexOf("SELECT")<0 || arguementsArr.indexOf("FROM")<0){
            return {"message" : "Bad Request2"};
        }

        if(arguementsArr.indexOf("WHERE")>0 
        && (arguementsArr.indexOf("=")<0 
        && arguementsArr.indexOf("<")<0
        && arguementsArr.indexOf("=")<0
        && arguementsArr.indexOf(">")<0
        )){
            return {"message" : "Bad Request"};
        }

        if(arguementsArr.indexOf("WHERE")<0 
        && (arguementsArr.indexOf("=")>0 
        || arguementsArr.indexOf("<")>0
        || arguementsArr.indexOf("=")>0
        || arguementsArr.indexOf(">")>0
        )){
            return {"message" : "Bad Request"};
        }
        
        for(var i=0;i<arguementsArr.length;i++){
            if(arguementsArr[i] === "SELECT"){collectNow = true;}

            if(arguementsArr[i] === "FROM"){
                collectNow = false; 
                break;
            }

            if(collectNow === true &&  i > 0){
                this.attributes.push(arguementsArr[i]);
            }

        }

        for(var i=0;i<arguementsArr.length;i++){
            this.command = arguementsArr[0];

            if(arguementsArr[i] == "FROM"){
                this.from = arguementsArr[i+1];
            }

            if(arguementsArr[i] == "WHERE"){
                this.conditionField = arguementsArr[i+1];
            }
            
            if(arguementsArr[i] == "<" || arguementsArr[i] == "=" || arguementsArr[i] == ">"){
                this.condition = arguementsArr[i];
                this.conditionValue = arguementsArr[i+1];
            }

        }

        const res = {
            "command" : this.command,
            "attributes" : this.attributes,
            "from" : this.from,
            "conditionField" : this.conditionField,
            "condition" : this.condition,
            "conditionValue" : this.conditionValue
        }

        return res;
    }


};