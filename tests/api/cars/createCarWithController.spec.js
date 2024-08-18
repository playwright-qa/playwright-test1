import {CAR_MODELS} from "../../../src/data/carModels";
import {CAR_BRANDS} from "../../../src/data/carBrands";
import CarsController from "../../../src/contrlollers/CarsController";
import {expect, test} from "../../../src/fixtures/myFixtures.js";
import { faker } from '@faker-js/faker';

test.describe("Car with controller", ()=>{
    let carsController

    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        for (const car of cars) {
            const res = await request.delete(`/api/cars/${car.id}`)
            await expect(res).toBeOK()
        }
    })

    test(`Get car brands`, async ({request})=>{
        carsController = new CarsController(request)
        const brandsList = await carsController.getCarsBrands()
        const data = await brandsList.json()
        expect(data.status, "Status should be ok").toBe('ok');
        expect(data.data.forEach(car => {
            expect(car).toHaveProperty('id');
            expect(car).toHaveProperty('title');
            expect(car).toHaveProperty('logoFilename');
        }))
    })

    test(`Get car brands by id`, async ({request})=>{
        carsController = new CarsController(request)
        const brandId = await carsController.getCarsBrandsById(1)
        const data = await brandId.json()
        expect(data.status, "Status should be ok").toBe('ok');
        expect(data.data.title, "Title should be equal to id").toBe('Audi');
    })

    test(`Get car models`, async ({request})=>{
        carsController = new CarsController(request)
        const modelsList = await carsController.getCarModels()
        const data = await modelsList.json()
        expect(data.status, "Status should be ok").toBe('ok');
        expect(data.data.forEach(car => {
            expect(car).toHaveProperty('id');
            expect(car).toHaveProperty('carBrandId');
            expect(car).toHaveProperty('title');
        }))
    })

    test(`Get car models by id`, async ({request})=>{
        carsController = new CarsController(request)
        const modelId = await carsController.getCarsModelsById(1)
        const data = await modelId.json()
        expect(data.status, "Status should be ok").toBe('ok');
        expect(data.data.id, "Model id should be equal to id").toBe(1);
        expect(data.data.title, "Title should be equal to id").toBe('TT');
    })

    test(`Get current user cars`, async ({request, newCar: createdCar})=>{
        carsController = new CarsController(request)
        const carsList = await carsController.getCars()
        const data = await carsList.json()
        expect(data.status, "Status should be ok").toBe('ok');
        expect(createdCar.brand, "Brand should be equal to current user car").toBe('Audi');
        expect(data.data.forEach(car => {
            expect(car).toHaveProperty('id');
            expect(car).toHaveProperty('carBrandId');
            expect(car).toHaveProperty('carModelId');
        }))
});

    test(`Create new car`, async ({carsController})=>{
        const requestBody = {
            "carBrandId": CAR_BRANDS.Audi.id,
            "carModelId": CAR_MODELS.Audi.TT.id,
            "mileage": faker.number.int({min: 1, max: 100})
        }
        const response = await carsController.createCar(requestBody)
        expect(response.status(), "Status code should be valid").toBe(201)
    })

    test(`Get car by id`, async ({request, newCar: createdCar})=>{
        carsController = new CarsController(request)
        const carId = await carsController.getCarById(createdCar.id)
        const data = await carId.json()
        console.log(data)
        expect(data.status, "Status should be ok").toBe('ok');
        expect(createdCar.brand, "Brand should be equal to id").toBe('Audi');
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
    });

    test(`Delete car by id`, async ({request, newCar: createdCar})=>{
        carsController = new CarsController(request)
        const deleteResponse = await carsController.deleteCar(createdCar.id);
        const deleteData = await deleteResponse.json();
        expect(deleteData.status, "Status should be ok").toBe('ok');
        const secondDeleteResponse = await carsController.deleteCar(createdCar.id);
        expect(secondDeleteResponse.status(), "Status should be 404 or similar on re-delete").toBe(404);
    });
})


