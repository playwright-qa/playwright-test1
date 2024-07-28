
export class SigninModal {

    constructor(page) {
        this.page = page;
        this.emailField = this.page.locator('#signinEmail');
        this.passwordField = this.page.locator('#signinPassword');
        this.rememberCheckbox = this.page.locator('#remember');
        this.logInBtn = this.page.locator('.modal-footer .btn-primary');
    }

    async logIn(registrationData) {
        await this.emailField.fill(registrationData.email);
        await this.passwordField.fill(registrationData.password);
        await this.rememberCheckbox.check();
        await this.logInBtn.click();
    }
}