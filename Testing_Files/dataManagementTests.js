const axios = require('axios');
const { response } = require('express');


const ANSI = {
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",

	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
}

class Data_Management_Tests{
    constructor(){
        this.passed = 0;
        this.total = 4;
        
    }

    //Test 1 - Server Connection
    test1(res){
        if(res.status === "success"){
            console.log(ANSI.Bright + 'Test 1: Server Connection - ' + ANSI.FgGreen+ 'Passed' + ANSI.Reset);
            this.passed += 1;
        }else{
            console.log(ANSI.Bright + "Test 1: Server Connection - " + ANSI.FgRed + "Failed" + ANSI.Reset);
        }
        
        console.log("Expected Status:"+ANSI.Bright + " success" + ANSI.Reset);
        console.log("Actual Status: " + ANSI.Bright + res.status + ANSI.Reset + "\n");
    }

    //Bad Request
    test2(res){
        if(res.status === 400){
            console.log(ANSI.Bright +'Test 2: Bad Request - ' + ANSI.FgGreen+ 'Passed' + ANSI.Reset);
            this.passed += 1;

        }else{
            console.log(ANSI.Bright + "Test 2: Bad Request - " + ANSI.FgRed + "Failed" + ANSI.Reset);
        }
        
        console.log("Expected Status:"+ANSI.Bright+ " 400" + ANSI.Reset);
        console.log("Actual Status: "+ ANSI.Bright + res.status+ ANSI.Reset +  "\n");

    }

    //Test 3 - Retrieve Database
    test3(res){
        if(res.status === "successful"){
            console.log(ANSI.Bright +'Test 3: Retrieve Database - ' + ANSI.FgGreen+ 'Passed' + ANSI.Reset);
            this.passed += 1;
        }else{
            console.log(ANSI.Bright + "Test 3: Retrieve Database - " + ANSI.FgRed + "Failed" + ANSI.Reset);
        }
        
        console.log("Expected Status:"+ANSI.Bright+ " successful" + ANSI.Reset);
        console.log("Actual Status: "+ ANSI.Bright + res.status+ ANSI.Reset +  "\n");

    }

        //Test 4 - Bad Request [Retrieve Database]
        test4(res){
            if(res.status === "unsuccessful" && res.config === "" && res.db === ""){
                console.log(ANSI.Bright +'Test 3: Bad Request [Retrieve Database] - ' + ANSI.FgGreen+ 'Passed' + ANSI.Reset);
                this.passed += 1;
            }else{
                console.log(ANSI.Bright + "Test 3: Bad Request [Retrieve Database] - " + ANSI.FgRed + "Failed" + ANSI.Reset);
            }
            
            console.log("Expected Status:"+ANSI.Bright+ " unsuccessful" + ANSI.Reset);
            console.log("Actual Status: "+ ANSI.Bright + res.status+ ANSI.Reset);
            console.log("Expected Config:"+ANSI.Bright+ "''" + ANSI.Reset);
            console.log("Actual Config: '"+ ANSI.Bright + res.config+ "'" + ANSI.Reset );
            console.log("Expected DB:"+ANSI.Bright+ "''" + ANSI.Reset);
            console.log("Actual DB: '"+ ANSI.Bright + res.db +  "'" + ANSI.Reset + "\n");
    
        }

        EndTest(){
            const prcnt = (this.passed/this.total) * 100;
            console.log("\n" + ANSI.Bright + "Data Management Testing Resulted in " + ANSI.FgYellow + this.passed + "/" + this.total + ANSI.Reset + ANSI.Bright  + " Tests Passed" + ANSI.Reset + "\n" );
        }


}

const dataManagementTests = new Data_Management_Tests();

//Test 1 - Server Connection
axios.get('http://localhost:3000', {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    dataManagementTests.test1(response.data);
    
})
.catch(error => {
    console.error('Error making POST request:', error);
});
//////////////////////////////////////////////////////////////////

//Test 2 - Bad Request
axios.post('http://localhost:3000', {
    method: "",
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    dataManagementTests.test2(response)
    
    
})
.catch(error => {
    dataManagementTests.test2(error);

});
//////////////////////////////////////////////////////////////////

//Test 3 - Retrieve Database
axios.post('http://localhost:3000', {
        
    "method": "rtv",
    "dbId": "1234567890",
    "api": "23525119"
        
})
.then(response => {
    dataManagementTests.test3(response.data);
})
.catch(error => {
    console.error('Error making POST request:', error);
});
//////////////////////////////////////////////////////////////////

//Test 4 - Bad Request [Retrieve Database]
axios.post('http://localhost:3000', {
        
    "method": "rtv",
    "dbId": "123456789",
    "api": "23525119"
        
})
.then(response => {
    dataManagementTests.test4(response.data);
})
.catch(error => {
    console.error('Error making POST request:', error);
});
//////////////////////////////////////////////////////////////////

//End Test
axios.post('http://localhost:3000', {
        
    "method": "End Server"
        
})
.then(response => {
    dataManagementTests.EndTest()
})
.catch(error => {
    console.error('Error making POST request:', error);
});
//////////////////////////////////////////////////////////////////
