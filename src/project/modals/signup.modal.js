import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class SignupModal {

    constructor(
        page
    ) {
        this.page = page;
    }


    elements = {
        nameField: () => this.page.locator('#signupName'),
        lastNameField: () => this.page.locator('#signupLastName'),
        emailField: () => this.page.locator('#signupEmail'),
        passwordField: () => this.page.locator('#signupPassword'),
        repeatPasswordField: () => this.page.locator('#signupRepeatPassword'),
        registrationBtn: () => this.page.locator('.modal-footer .btn-primary'),
        invalidFeedback: () => this.page.locator('.invalid-feedback').first(),
    };

    async checkRegistrationBtnIsDisabled() {
        await expect(this.elements.registrationBtn()).toBeDisabled()
    }

    async clickOnRegisterBtn(){
        await this.elements.registrationBtn().click();
    }

    async registerNewCustomer(registrationData) {
        await this.elements.nameField().fill(registrationData.name);
        await this.elements.lastNameField().fill(registrationData.last_name);
        await this.elements.emailField().fill(registrationData.email);
        await this.elements.passwordField().fill(registrationData.password);
        await this.elements.repeatPasswordField().fill(registrationData.password);
        await this.elements.registrationBtn().click();
    }

    async checkNameField(registrationData){
        await this.elements.nameField().fill('123');
        await this.elements.lastNameField().fill('Test');
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Name is invalid');
        await this.elements.nameField().clear();
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Name required');
        await this.elements.nameField().fill('k');
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Name has to be from 2 to 20 characters long');
        await this.elements.nameField().clear();
        await this.elements.nameField().fill(registrationData.name);
    }

    async checkLastNameField(registrationData){
        await this.elements.lastNameField().fill('123');
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Last name is invalid');
        await this.elements.lastNameField().clear();
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Last name required');
        await this.elements.lastNameField().fill('k');
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Last name has to be from 2 to 20 characters long');
        await this.elements.lastNameField().clear();
        await this.elements.lastNameField().fill(registrationData.last_name);
    }

    async checkEmailField(registrationData){
        await this.elements.emailField().fill('123');
        await this.elements.lastNameField().click();
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Email is incorrect');
        await this.elements.emailField().clear();
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Email required');
        await this.elements.emailField().fill(registrationData.email);
    }

    async checkPasswordFields(registrationData){
        await this.elements.passwordField().fill('145Ktest');
        await this.elements.repeatPasswordField().fill(registrationData.password);
        await this.elements.passwordField().click();
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Passwords do not match');
        await this.elements.passwordField().clear();
        await this.elements.passwordField().fill(registrationData.password);
        await this.elements.passwordField().clear();
        await this.elements.passwordField().fill('2332');
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await this.elements.passwordField().clear();
        await expect(this.elements.invalidFeedback()).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.elements.invalidFeedback()).toHaveText('Password required');
        await this.elements.passwordField().clear();
        await this.elements.passwordField().fill(registrationData.password);
        await this.elements.repeatPasswordField().fill(registrationData.password);
    }
}