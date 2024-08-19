import {expect, test} from "../../../src/fixtures/myFixtures";
import {CAR_BRANDS} from "../../../src/data/carBrands";
import {CAR_MODELS} from "../../../src/data/carModels";
import {faker} from "@faker-js/faker";

test.describe("Car with controller", ()=>{

    test(`Create new car`, async ({carsController})=>{
        const requestBody = {
            "carBrandId": CAR_BRANDS.Audi.id,
            "carModelId": CAR_MODELS.Audi.TT.id,
            "mileage": faker.number.int({min: 1, max: 100})
        }
        const response = await carsController.createCar(requestBody)
        expect(response.status(), "Status code should be valid").toBe(201)
        //delete car after test
        const res = await carsController.deleteCar(createdCar.id);
        await expect(res).toBeOK();
    })
})