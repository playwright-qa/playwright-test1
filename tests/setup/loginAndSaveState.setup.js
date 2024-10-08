import {test as setup} from "@playwright/test";
import {USERS} from "../../src/data/users.js";
import {USER1_STORAGE_STATE_PATH} from "../../src/data/constants.js";


setup(`Login as ${USERS.USER1.email} and save storage state`, async ({request})=>{
    // const welcomePage = new WelcomePage(page)
    // await welcomePage.navigate()
    // const signInPopup = await welcomePage.header.clickSignInButton()
    // await signInPopup.emailInput.fill(USERS.USER1.email);
    // await signInPopup.passwordInput.fill(USERS.USER1.password);
    // await signInPopup.loginBtn.click()

    // await expect(page).toHaveURL(/garage/)


    //  save to file
    // await page.context().storageState({
    //     path: USER1_STORAGE_STATE_PATH
    // })

    await request.post('/api/auth/signin', {
        data: {
            "email": USERS.USER1.email,
            "password": USERS.USER1.password,
            "remember": false
        }
    })

    await request.storageState({
        path: USER1_STORAGE_STATE_PATH
    })
})