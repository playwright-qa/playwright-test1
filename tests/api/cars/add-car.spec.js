import {expect, test} from "../../../src/fixtures/myFixtures.js";
import {CAR_MODELS} from "../../../src/data/carModels";
import {CAR_BRANDS} from "../../../src/data/carBrands";

test.describe("Add car", () => {

    test.afterAll(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
        }
    })

    for (const [brandKey, carBrand] of Object.entries(CAR_BRANDS)) {
        const carModels = CAR_MODELS[brandKey];

            for (const [modelKey, carModel] of Object.entries(carModels)) {
                test(`Create car with brand ${carBrand.title} and model ${modelKey}`, async ({ request }) => {
                    const requestBody = {
                        carBrandId: carBrand.id,
                        carModelId: carModel.id,
                        mileage: Math.floor(Math.random() * 10000)
                    };

                    const response = await request.post('/api/cars', { data: requestBody });
                    expect(response.status()).toBe(201);
                    const actualBody = response.json();

                    expect(actualBody).toEqual({
                        status: "ok",
                        data: {
                            id: expect.any(Number),
                            carBrandId: requestBody.carBrandId,
                            carModelId: requestBody.carModelId,
                            initialMileage: requestBody.mileage,
                            updatedMileageAt: expect.any(String),
                            carCreatedAt: expect.any(String),
                            mileage: requestBody.mileage,
                            brand: carBrand.title,
                            model: carModel.title,
                            logo: carBrand.logoFilename
                        }
                    });
                });
            }
        }
});