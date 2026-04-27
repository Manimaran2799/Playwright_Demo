


const {test, expect}=require('@playwright/test');


/*Annotations
only--->for running specific test in class and we can also provide only for multiple tests

Skip--->for skipping the particular of execution
eg: particular feature is not builded or not needed now

Fixme--->I need that particular test, but I know it is going to fail due to broken app or features,i just want to skip by knowing before

Fail--->"We use fail() when we don’t want to skip execution but still acknowledge a known defect."

Slow:
 it will triple the timeout what we configure on config file
*/

// test.only('Test 1',async ({page})=>{

//     console.log("Test 1....")
// })


// test("Test 2 ", async ({page})=>{

//     test.skip();
//     console.log("Test 2....")
// })


// test("Test 3", async ({page})=>{
//     test.fail();
//     expect(10).toBe(5);
//     console.log("Test 3....")
// })


test("Test 4", async ({page})=>{


    test.slow();
    console.log("Test 4....")
})


// test("Test 5", async ({page})=>{

//     console.log("Test 5....")
// })