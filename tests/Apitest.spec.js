// API
const { test, expect } = require('@playwright/test');

let id;

// ---------------- GET ----------------
test.only('test for get', async ({ request }) => {

    const response = await request.get(
        "https://reqres.in/api/users?page=2"
        ,
       { headers :"x-api-key': 'reqres-free-v1",
        'Content-Type': 'application/json'
       }
    );

    const body = await response.json();
    console.log(body);

    expect(response.status()).toBe(200);
});

// ---------------- POST ----------------
test('test for Create', async ({ request }) => {

    const response = await request.post(
        'https://reqres.in/api/users',
        {
            data: {
                name: 'CJ',
                job: 'QA Engineer'
            },
            headers: {
                'x-api-key': 'reqres-free-v1',
                'Content-Type': 'application/json'
                
            }
        }
    );

    const body = await response.json();
    console.log(body);

    id = body.id;

    expect(response.status()).toBe(201);
});


// ---------------- PATCH ----------------
test('Test for update', async ({ request }) => {

    const response = await request.patch(
        'https://reqres.in/api/users/' + (id || 2),
        {
            data: {
                name: 'Carl Updated',
                job: 'Senior QA'
            },
            headers: {
                'x-api-key': 'reqres-free-v1',
                'Content-Type': 'application/json'
            }
        }
    );

    const body = await response.json();
    console.log(body);

    expect(response.status()).toBe(200);
});


// ---------------- DELETE ----------------
test('delete the user', async ({ request }) => {

    const response = await request.delete(
        'https://reqres.in/api/users/' + (id || 2)
    );

    expect(response.status()).toBe(204);
});