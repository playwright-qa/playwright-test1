import {HomePage} from "../project/pages/home.page";
import {test} from "@playwright/test";
import {SignupModal} from "../project/modals/signup.modal";
import {SigninModal} from "../project/modals/signin.modal";
import {getRegistrationData} from "../utils/registration-data";
import {HeaderMenu} from "../project/pages/header-menu.page";
import {PersonalAreaPage} from "../project/pages/personal.area.page";


test.describe('Check registration form', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://qauto.forstudy.space/');
    });

    test('Register new customer and login', async ({ page }) => {
        const registrationData = getRegistrationData();

        await new HomePage(page).clickOnSignUpBtn();
        await new SignupModal(page).registerNewCustomer(registrationData);
        await new PersonalAreaPage(page).clickOnLogoutBtn();
        await new HeaderMenu(page).clickOnSignInBtn();
        await new SigninModal(page).logIn(registrationData);
    });

    test('Check validation errors', async ({ page }) => {
        const signupModal = await new SignupModal(page);
        const headerMenu = new HeaderMenu(page);
        const registrationData = getRegistrationData();

        await new HomePage(page).clickOnSignUpBtn();
        await signupModal.checkRegistrationBtnIsDisabled();
        await signupModal.checkNameField(registrationData);
        await signupModal.checkLastNameField(registrationData);
        await signupModal.checkEmailField(registrationData);
        await signupModal.checkPasswordFields(registrationData);
        await signupModal.clickOnRegisterBtn();
        await new PersonalAreaPage(page).clickOnLogoutBtn();
        await headerMenu.clickOnSignInBtn();
        await new SigninModal(page).logIn(registrationData);
        await headerMenu.isLoginSuccess();
    });
});

