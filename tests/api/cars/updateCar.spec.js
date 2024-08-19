import {expect, test} from "../../../src/fixtures/myFixtures";
import CarsController from "../../../src/contrlollers/CarsController";

test.describe("Edit car with controller", ()=>{

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
        const res = await carsController.deleteCar(createdCar.id);
        await expect(res).toBeOK();
    });
});