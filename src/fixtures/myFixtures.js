import {test as base, expect as baseExpect, request as apiRequest} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import {USER1_STORAGE_STATE_PATH} from "../data/constants.js";
import CarsController from "../contrlollers/CarsController";
import {CAR_BRANDS} from "../data/carBrands";
import {CAR_MODELS} from "../data/carModels";
import {faker} from "@faker-js/faker";

export const test = base.extend({
    context: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: USER1_STORAGE_STATE_PATH
        })

        await use(ctx)

        await ctx.close()
    },
    request: async ({}, use)=>{
        const ctx = await apiRequest.newContext({
            //  get from file
            storageState: USER1_STORAGE_STATE_PATH
        })

        await use(ctx)

        await ctx.dispose()
    },

    carsController:  async ({request}, use)=>{
        await use(new CarsController(request))
    },

    newCar: async ({request, carsController}, use)=>{
        // before test
        const carBrand = CAR_BRANDS.Audi
        const carModel = CAR_MODELS.Audi.A6

        const requestBody = {
            "carBrandId": carBrand.id,
            "carModelId": carModel.id,
            "mileage": faker.number.int({min: 1, max: 100})
        }
        const response = await carsController.createCar(requestBody)
        const body = await response.json()
        // pass to test
        use(body.data)

        // after test
        await request.delete(`/api/cars/${body.id}`)
    },

    garagePage: async ({page}, use)=>{
        const gp = new GaragePage(page)

        use(gp)
    },
})

export const expect = baseExpect