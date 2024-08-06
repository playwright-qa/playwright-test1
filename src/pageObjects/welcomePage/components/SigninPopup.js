import BaseComponent from "../../../components/BaseComponent";
import {USERS} from "../../../data/users";

export default class SignInPopup extends BaseComponent {
    constructor(page) {
        super(page,  page.locator('app-signin-modal'))
        this.emailInput =  this.container.locator('#signinEmail')
        this.passwordInput =  this.container.locator('#signinPassword')
        this.loginBtn =  this.container.locator('.btn-primary')
    }

    async login (){
        await this.emailInput.fill(USERS.USER1.email);
        await this.passwordInput.fill(USERS.USER1.password);
        await this.loginBtn.click()
    }
}