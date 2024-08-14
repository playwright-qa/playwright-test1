import {expect, test} from "../../../src/fixtures/myFixtures.js";
import {CAR_BRANDS} from "../../../src/data/carBrands";
import {CAR_MODELS} from "../../../src/data/carModels";


test.describe("Add fuel expenses", () => {
    let carId = null;

    test.beforeAll(async ({ request }) => {
        const carBrands = CAR_BRANDS.Audi
        const modelBrands = CAR_MODELS.Audi
        const requestBody = {
            carBrandId: carBrands.id,
            carModelId: modelBrands.TT.id,
            mileage: 120
        };
        const response = await request.post('/api/cars', {
            data: requestBody
        });
        const body = await response.json();
        expect(body.data, "Car should be created").toMatchObject(requestBody);
        carId = body.data.id;
    });

    test.afterAll(async ({request})=>{

        const res = await request.delete(`/api/cars/${carId}`)
        await expect(res).toBeOK()
    })

    test('Add expenses', async ({ request }) => {
        const requestBody = {
            carId,
            liters: 1,
            mileage: 126,
            reportedAt: "2024-08-13T00:00:00.000Z",
            totalCost: 122,
        };

        const response =  await request.post('/api/expenses', {
            data: requestBody
        });
        const body = await response.json();
        expect(body.status, "Status code should be valid").toBe('ok')
    });
});
