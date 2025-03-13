module.exports = class INSERT{
    /**
     * Sets attributes of INSERT class
     * @constructor
     */
    constructor(){
        this.command = "";
        this.Dbname = "";
        this.fields = [];
        this.values = [];
    }

    /**
     * 
     * @param {string} query - SQL statement
     * @returns {JSON}  JSON object of SQL attributes
     */
    interpret(query){
        if(query === "") return {"message" : "Bad Request"};

        var arguementsArr = query.split(" ");

        for(var i=0;i<arguementsArr.length;i++){
            arguementsArr[i] = arguementsArr[i].replace("(","");
            arguementsArr[i] = arguementsArr[i].replace(",","");
            arguementsArr[i] = arguementsArr[i].replace(")","");
            arguementsArr[i] = arguementsArr[i].replace(";","");
            arguementsArr[i] = arguementsArr[i].replace("\"","");
        }

        if(arguementsArr.indexOf("INSERT")<0 || arguementsArr.indexOf("VALUES")<0 || arguementsArr.indexOf("INTO")<0){
            return {"message" : "Bad Request"};
        }

        this.command = arguementsArr[0];
        this.Dbname = arguementsArr[2];

        var takeValues = false;
        var takeFields = false;

        for(var i=0;i<arguementsArr.length; i++){
            if(arguementsArr[i] === this.Dbname){
                takeFields = true;
                continue;
            }

            if(takeFields && arguementsArr[i] !== "VALUES") this.fields.push(arguementsArr[i]);

            if(arguementsArr[i] === "VALUES"){
                takeValues = true;
                takeFields = false;
                continue;
            }

            if(takeValues) this.values.push(arguementsArr[i]);
        }

        if(this.fields.length !== this.values.length) return {"message" : "Bad Request"};

        const res = {
            "command" : this.command,
            "DBname" : this.Dbname,
            "fields" : this.fields,
            "values" : this.values
        }

        return res;
    }
};