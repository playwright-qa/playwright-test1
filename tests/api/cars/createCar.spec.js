import {expect, test} from "../../../src/fixtures/myFixtures";
import {CAR_BRANDS} from "../../../src/data/carBrands";
import {CAR_MODELS} from "../../../src/data/carModels";
import {faker} from "@faker-js/faker";

test.describe("Car with controller", ()=>{

    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
        }
    })

    test(`Create new car`, async ({carsController}) => {
        const requestBody = {
            "carBrandId": CAR_BRANDS.Audi.id,
            "carModelId": CAR_MODELS.Audi.TT.id,
            "mileage": faker.number.int({min: 1, max: 100})
        };
        const response = await carsController.createCar(requestBody);
        expect(response.status()).toBe(201);

        const actualBody = await response.json(); // Используем await для парсинга JSON

        const expectedResponse = {
            status: 'ok',
            data: {
                id: expect.any(Number),
                carBrandId: requestBody.carBrandId,
                carModelId: requestBody.carModelId,
                initialMileage: requestBody.mileage,
                updatedMileageAt: expect.any(String),
                carCreatedAt: expect.any(String),
                mileage: requestBody.mileage,
                brand: CAR_BRANDS.Audi.title,
                model: CAR_MODELS.Audi.TT.title,
                logo: expect.any(String)
            }
        };
        expect(actualBody).toEqual(expectedResponse);
    });
});