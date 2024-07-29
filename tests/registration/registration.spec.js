import {expect, test} from "@playwright/test";
import {getRegistrationData} from "../../src/utils/registration-data";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage";


test.describe("Check registration form", ()=>{
    let signupPopup

    test.beforeEach(async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        signupPopup = await welcomePage.clickOnSignUpBtn()
    })


    test('Register new customer', async({page})=>{
        const registrationData = getRegistrationData();
        await signupPopup.registerNewCustomer(registrationData);
    })


    test('Empty name', async({page})=>{
        await signupPopup.nameField.focus()
        await signupPopup.nameField.blur()
        await expect(signupPopup.nameValidationMessage).toHaveText('Name required');
        await expect(signupPopup.nameValidationMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Wrong name', async({page})=>{
        await signupPopup.nameField.fill('123')
        await signupPopup.nameField.blur()
        await expect(signupPopup.nameValidationMessage).toHaveText('Name is invalid');
        await expect(signupPopup.nameValidationMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Last name is too long', async({page})=>{
        await signupPopup.lastNameField.fill('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        await signupPopup.lastNameField.blur()
        await expect(signupPopup.lastNameValidationMessage).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(signupPopup.lastNameValidationMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Wrong email and empty email', async({page})=>{
        await signupPopup.emailField.fill('123')
        await signupPopup.emailField.blur()
        await expect(signupPopup.emailValidationMessage).toHaveText('Email is incorrect');
        await expect(signupPopup.emailValidationMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await signupPopup.emailField.clear()
        await expect(signupPopup.emailValidationMessage).toHaveText('Email required');
        await expect(signupPopup.emailValidationMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Verify Password Mismatch', async({page})=>{
        const registrationData = getRegistrationData();
        await signupPopup.passwordField.fill(registrationData.password)
        await signupPopup.repeatPasswordField.fill(registrationData.password + '1')
        await signupPopup.repeatPasswordField.blur()
        await expect(signupPopup.repeatValidationMessage).toHaveText('Passwords do not match');
        await expect(signupPopup.repeatValidationMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
})