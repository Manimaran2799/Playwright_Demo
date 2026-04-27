const Module = require("node:module");

class ApiUtils{


    //const
    constructor(apicontext,loginpayload){
        this.apicontext=apicontext;
        this.loginpayload=loginpayload;
    }

    //gettoken
    async gettoken(){
    const response = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: this.loginpayload }
    );

 
    const responsejson = await response.json(); //capture the response obj as json format
    const token = responsejson.token;  //from json --->extracting token
    console.log(responsejson);  //printing all login response
    return token;


    }

   async  createorder(orderpayload){

    let response={};
    response.token= await this.gettoken();

         //create order api
         const responseobjectorder=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data:orderpayload,

        
        
            headers :{'authorization':response.token,'content-type':'application/json'}}//sending token extracted from Login 
        );
        
        const responsejsonorder = await responseobjectorder.json(); 
        console.log(responsejsonorder);//printing all create order response
        const orderID=responsejsonorder.orders[0];  //extracting orderID
        response.orderID=orderID;
     
        return response;

    }




}
module.exports = { ApiUtils };