import {test} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage";
import {getRegistrationData} from "../../src/utils/registration-data";

test.describe("Check registration form", ()=>{
    let signInPopup

    test.beforeEach(async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        signInPopup = await welcomePage.header.clickOnSignInButton()
    })


    test('Login', async({page})=>{
        const registrationData = getRegistrationData();
        await signInPopup.login(registrationData);
    })
})