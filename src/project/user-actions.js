import { HomePage } from "./pages/home.page";
import { SignupModal } from "./modals/signup.modal";
import { SigninModal } from "./modals/signin.modal";
import { HeaderMenu } from "./pages/header-menu.page";
import { PersonalAreaPage } from "./pages/personal.area.page";

export class UserActions {
    constructor(page) {
        this.homePage = new HomePage(page);
        this.signupModal = new SignupModal(page);
        this.signinModal = new SigninModal(page);
        this.headerMenu = new HeaderMenu(page);
        this.personalAreaPage = new PersonalAreaPage(page);
    }

    async registerNewCustomer(registrationData) {
        await this.homePage.clickOnSignUpBtn();
        await this.signupModal.registerNewCustomer(registrationData);
    }

    async logout() {
        await this.personalAreaPage.clickOnLogoutBtn();
    }

    async login(registrationData) {
        await this.headerMenu.clickOnSignInBtn();
        await this.signinModal.logIn(registrationData);
        await this.headerMenu.isMyProfileBtnVisible();
    }

    async checkValidationErrors(registrationData) {
        await this.homePage.clickOnSignUpBtn();
        await this.signupModal.checkNameField(registrationData);
        await this.signupModal.checkLastNameField(registrationData);
        await this.signupModal.checkEmailField(registrationData);
        await this.signupModal.checkPasswordFields(registrationData);
        await this.signupModal.clickOnRegistrationBtn();
        await this.personalAreaPage.clickOnLogoutBtn();
        await this.headerMenu.clickOnSignInBtn();
        await this.signinModal.logIn(registrationData);
        await this.headerMenu.isMyProfileBtnVisible();
    }
}