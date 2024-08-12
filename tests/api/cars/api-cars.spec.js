import {expect, test} from "../../../src/fixtures/myFixtures.js";

test.describe("Cars", ()=>{

    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
        }
    })

    test("Create car", async({request})=>{
        const requestBody = {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 122
        }
        const response = await request.post('/api/cars', {
            data: requestBody
        })
        const body = await response.json()
        expect(body.data, "Car should be created").toMatchObject(requestBody)
    })


    test('Negative: Create a car without required fields', async({request})=>{
        const response = await request.post('/api/cars', {
            data: {}
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toContain('Car brand id is required');
    });

    test('Negative: Create a car with invalid carModelId', async({request})=>{
        const response = await request.post('/api/cars', {
            data: {
            carBrandId: 1,
            carModelId: 'testtest',
            mileage: 500
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toContain('Invalid car model type');
    });

    test('Negative: Create a car with invalid mileage', async({request})=>{
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 12,
                mileage: -500
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toContain('Mileage has to be from 0 to 99999');
    });

    test('Negative: Create a car with invalid car Brand Id', async({request})=>{
        const response = await request.post('/api/cars', {
            data: {
            carBrandId: -1,
            carModelId: 12,
            mileage: 500
            }
        });

        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toContain('Brand not found');
    });
});