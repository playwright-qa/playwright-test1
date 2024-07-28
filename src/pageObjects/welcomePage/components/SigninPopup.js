import BaseComponent from "../../../components/BaseComponent";

export default class SignInPopup extends BaseComponent {
    constructor(page) {
        super(page,  page.locator('app-signin-modal'))
        this.emailInput =  this.container.locator('#signinEmail')
        this.passwordInput =  this.container.locator('#signinPassword')
        this.loginBtn =  this.container.locator('.btn-primary')
    }

    async login (registrationData){
        await this.emailInput.fill(registrationData.email);
        await this.passwordInput.fill(registrationData.password);
        await this.loginBtn.click()
    }
}