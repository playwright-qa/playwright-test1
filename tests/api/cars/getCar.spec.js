import {expect, test} from "../../../src/fixtures/myFixtures";
import CarsController from "../../../src/contrlollers/CarsController";
import {CAR_BRANDS} from "../../../src/data/carBrands";
import {CAR_MODELS} from "../../../src/data/carModels";

test.describe("Get cars info with controller", ()=>{

    test.afterEach(async ({carsController})=>{
        const carsList = await carsController.getCars()
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await carsController.deleteCar(`${car.id}`)
            await expect(res).toBeOK()
        }
    })

    test(`Get car brands`, async ({ carsController }) => {
        const response = await carsController.getCarsBrands();
        const data = await response.json();
        expect(data.status, "Status should be ok").toBe('ok');
        const expectedBrands = Object.values(CAR_BRANDS);
        expect(data.data).toEqual(expectedBrands);
    });

    test(`Get car brands by id`, async ({carsController})=>{
        const brandId = await carsController.getCarsBrandsById(1)
        const data = await brandId.json()
        const expectedResponse = {
            status: 'ok',
            data: {
                    "id": CAR_BRANDS.Audi.id,
                    "title": CAR_BRANDS.Audi.title,
                    "logoFilename": CAR_BRANDS.Audi.logoFilename
            }
        };
        expect(data).toEqual(expectedResponse);
    })

    test(`Get car models`, async ({carsController})=>{
        const modelsList = await carsController.getCarModels()
        const data = await modelsList.json()
        const expectedBrandsArray = Object.values(CAR_MODELS).flatMap(brand =>
            Object.values(brand)
        );
        expect(data.data).toEqual(expectedBrandsArray);
    })

    test(`Get car models by id`, async ({carsController})=>{
        const modelId = await carsController.getCarsModelsById(1)
        const data = await modelId.json()
        const expectedResponse = {
            status: 'ok',
            data: {
                "id": CAR_MODELS.Audi.TT.id,
                "carBrandId": CAR_MODELS.Audi.TT.carBrandId,
                "title": CAR_MODELS.Audi.TT.title,
            }
        };
        expect(data).toEqual(expectedResponse);
    })

    test(`Get current user cars`, async ({carsController, newCar: createdCar})=>{
        const carsList = await carsController.getCars()
        const data = await carsList.json()
        const expectedCarResponse = {
            status: 'ok',
            data: [
                {
                    id: createdCar.id,
                    carBrandId: createdCar.carBrandId,
                    carModelId: createdCar.carModelId,
                    initialMileage: expect.any(Number),
                    updatedMileageAt: expect.any(String),
                    carCreatedAt: expect.any(String),
                    mileage: expect.any(Number),
                    brand: expect.any(String),
                    model: expect.any(String),
                    logo: expect.any(String),
                }
            ]
        };
        expect(data).toEqual(expectedCarResponse);
    });

    test(`Get car by id`, async ({carsController, newCar: createdCar})=>{
        const carId = await carsController.getCarById(createdCar.id)
        const data = await carId.json()
        const expectedResponse = {
            status: 'ok',
            data: [
                {
                    id: createdCar.id,
                    carBrandId: createdCar.carBrandId,
                    carModelId: createdCar.carModelId,
                    initialMileage: expect.any(Number),
                    updatedMileageAt: expect.any(String),
                    carCreatedAt: expect.any(String),
                    mileage: expect.any(Number),
                    brand: expect.any(String),
                    model: expect.any(String),
                    logo: expect.any(String),
                }
            ]
        };
        expect(data).toEqual(expectedResponse);
    })
})