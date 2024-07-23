
import { expect } from 'playwright/test';
export class SignupModal {
    constructor(page) {
        this.page = page;
        this.nameField = this.page.locator('#signupName');
        this.lastNameField = this.page.locator('#signupLastName');
        this.emailField = this.page.locator('#signupEmail');
        this.passwordField = this.page.locator('#signupPassword');
        this.repeatPasswordField = this.page.locator('#signupRepeatPassword');
        this.registrationBtn = this.page.locator('.modal-footer .btn-primary');
        this.invalidFeedback = this.page.locator('.invalid-feedback').first();
    }

    async registerNewCustomer(registrationData) {
        await this.fillNameField(registrationData.name);
        await this.fillLastNameField(registrationData.last_name);
        await this.fillEmailField(registrationData.email);
        await this.fillPasswordField(registrationData.password);
        await this.fillRepeatPasswordField(registrationData.password);
        await this.registrationBtn.click();
    }

    async checkNameField(registrationData) {
        await this.verifyInvalidName('123', 'Name is invalid');
        await this.verifyInvalidName('', 'Name required');
        await this.verifyInvalidName('k', 'Name has to be from 2 to 20 characters long');
        await this.resetNameField(registrationData.name);
    }

    async checkLastNameField(registrationData) {
        await this.verifyInvalidLastName('123', 'Last name is invalid');
        await this.verifyInvalidLastName('', 'Last name required');
        await this.verifyInvalidLastName('k', 'Last name has to be from 2 to 20 characters long');
        await this.resetLastNameField(registrationData.last_name);
    }

    async checkEmailField(registrationData) {
        await this.verifyInvalidEmail('123', 'Email is incorrect');
        await this.verifyInvalidEmail('', 'Email required');
        await this.resetEmailField(registrationData.email);
    }

    async checkPasswordFields(registrationData) {
        await this.verifyPasswordMismatch('145Ktest', registrationData.password);
        await this.verifyInvalidPassword('2332', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await this.verifyEmptyPassword();
        await this.resetPasswordFields(registrationData.password);
    }

    async fillNameField(name) {
        await this.nameField.fill(name);
    }

    async fillLastNameField(lastName) {
        await this.lastNameField.fill(lastName);
    }

    async fillEmailField(email) {
        await this.emailField.fill(email);
    }

    async fillPasswordField(password) {
        await this.passwordField.fill(password);
    }

    async fillRepeatPasswordField(password) {
        await this.repeatPasswordField.fill(password);
    }

    async clickOnRegistrationBtn() {
        await this.registrationBtn.click();
    }

    async verifyInvalidName(value, expectedErrorText) {
        await this.fillNameField(value);
        await this.lastNameField.fill('Test');
        await this.checkInvalidFeedback(expectedErrorText);
    }

    async verifyInvalidLastName(value, expectedErrorText) {
        await this.fillLastNameField(value);
        await this.checkInvalidFeedback(expectedErrorText);
    }

    async verifyInvalidEmail(value, expectedErrorText) {
        await this.fillEmailField(value);
        await this.lastNameField.click();
        await this.checkInvalidFeedback(expectedErrorText);
    }

    async verifyPasswordMismatch(password, repeatPassword) {
        await this.fillPasswordField(password);
        await this.fillRepeatPasswordField(repeatPassword);
        await this.passwordField.click();
        await this.checkInvalidFeedback('Passwords do not match');
    }

    async verifyInvalidPassword(password, expectedErrorText) {
        await this.fillPasswordField(password);
        await this.checkInvalidFeedback(expectedErrorText);
    }

    async verifyEmptyPassword() {
        await this.fillPasswordField('');
        await this.checkInvalidFeedback('Password required');
    }

    async resetNameField(name) {
        await this.nameField.clear();
        await this.fillNameField(name);
    }

    async resetLastNameField(lastName) {
        await this.lastNameField.clear();
        await this.fillLastNameField(lastName);
    }

    async resetEmailField(email) {
        await this.emailField.clear();
        await this.fillEmailField(email);
    }

    async resetPasswordFields(password) {
        await this.fillPasswordField(password);
        await this.fillRepeatPasswordField(password);
    }

    async checkInvalidFeedback(expectedText) {
        await expect(this.invalidFeedback).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(this.invalidFeedback).toHaveText(expectedText);
    }
}