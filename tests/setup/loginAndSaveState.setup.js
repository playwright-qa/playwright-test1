import {expect, test as setup} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import {USER1_STORAGE_STATE_PATH} from "../../src/data/constants.js";
import SignInPopup from "../../src/pageObjects/welcomePage/components/SigninPopup";


setup(`Login and save storage state`, async ({page})=>{
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    await welcomePage.clickOnSignInBtn()
    await new SignInPopup(page).login();

    await expect(page).toHaveURL(/garage/)

    await page.context().storageState({
        path: USER1_STORAGE_STATE_PATH
    })
})