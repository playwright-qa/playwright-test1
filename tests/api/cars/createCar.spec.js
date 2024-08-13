import {expect, test} from "@playwright/test";
import {CAR_MODELS} from "../../../src/data/carModels";
import {CAR_BRANDS} from "../../../src/data/carBrands";


test.describe("Create car", () => {

    for (const [brandKey, carBrand] of Object.entries(CAR_BRANDS)) {
        const carModels = CAR_MODELS[brandKey];

        for (const carModel of Object.values(carModels)) {
            test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async ({ request }) => {

                const requestBody = {
                    "carBrandId": carBrand.id,
                    "carModelId": carModel.id,
                    "mileage": Math.floor(Math.random() * 100)
                };

                // Пример отправки запроса
                const response = await request.post('/api/cars', { data: requestBody });
                // Проверка ответа
                test.expect(response.ok()).toBeTruthy();
            });
        }
    }
});