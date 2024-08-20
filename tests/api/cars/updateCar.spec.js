import {expect, test} from "../../../src/fixtures/myFixtures";
import CarsController from "../../../src/contrlollers/CarsController";

test.describe("Edit car with controller", ()=>{

    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
        }
    })

    test(`Edit existing car`, async ({ request, newCar: createdCar }) => {
        const carsController = new CarsController(request);
        const requestBody = {
            carBrandId: 2,
            carModelId: 6,
            mileage: 150
        };
        const response = await carsController.editCarById(createdCar.id, requestBody);
        const data = await response.json();
        expect(data.status).toBe('ok');
        expect(data.data.carBrandId).toBe(requestBody.carBrandId);
        expect(data.data.carModelId).toBe(requestBody.carModelId);
        expect(data.data.mileage).toBe(requestBody.mileage);
        //delete car after test
    });
});