module.exports = class CREATE{
    /**
     * Sets attributes of CREATE class
     * @constructor
     */
    constructor(){
        this.command = "";
        this.DBname = "";
    }

    /**
     * 
     * @param {string} query - SQL statement
     * @returns {JSON}  JSON object of SQL attributes
     */
    interpret(query){
        var arguementsArr = query.split(" ");

        for(var i=0;i<arguementsArr.length;i++){
            arguementsArr[i] = arguementsArr[i].replace("(","");
            arguementsArr[i] = arguementsArr[i].replace(",","");
            arguementsArr[i] = arguementsArr[i].replace(")","");
            arguementsArr[i] = arguementsArr[i].replace(";","");
            arguementsArr[i] = arguementsArr[i].replace("\"","");
        }

        if(arguementsArr.length !== 2) return {"message" : "Bad Request"};
        if(arguementsArr[0] !== "CREATE") return {"message" : "Bad Request"};

        this.command = arguementsArr[0];
        this.DBname = arguementsArr[1];

    


        const res = {
            "command" : this.command ,
            "DBname" : this.DBname
        }

        return res;
    }
};