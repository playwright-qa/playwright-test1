import {expect, test} from "../../../src/fixtures/myFixtures";
import CarsController from "../../../src/contrlollers/CarsController";

test.describe("Delete car with controller", () => {

    test(`Delete car by id`, async ({request, newCar: createdCar}) => {
        const carsController = new CarsController(request);

        const deleteResponse = await carsController.deleteCar(createdCar.id);
        const deleteData = await deleteResponse.json();

        expect(deleteData.status, "Status should be ok").toBe('ok');
        const secondDeleteResponse = await carsController.deleteCar(createdCar.id);
        expect(secondDeleteResponse.status(), "Status should be 404 or similar on re-delete").toBe(404);
    });
});