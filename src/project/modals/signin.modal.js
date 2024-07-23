import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class SigninModal {

    constructor(
        page
    ) {
        this.page = page;
    }


    elements = {
        emailField: () => this.page.locator('#signinEmail'),
        passwordField: () => this.page.locator('#signinPassword'),
        rememberCheckbox: () => this.page.locator('#remember'),
        logInBtn: () => this.page.locator('.modal-footer .btn-primary'),


    };

    async logIn(registrationData) {
        await this.elements.emailField().fill(registrationData.email);
        await this.elements.passwordField().fill(registrationData.password);
        await this.elements.rememberCheckbox().check();
        await this.elements.logInBtn().click();


    }
}