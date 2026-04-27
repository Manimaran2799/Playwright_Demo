

const {test}=require('@playwright/test');

test('Test 1 @smoke',async ({page})=>{

    console.log("Test 1....")
})


test("Test 2 @smoke@reg", async ({page})=>{

    console.log("Test 2....")
})


test("Test 3 @smoke", async ({page})=>{

    console.log("Test 3....")
})


test("Test 4 @reg", async ({page})=>{

    console.log("Test 4....")
})


test("Test 5 @sanity", async ({page})=>{

    console.log("Test 5....")
})