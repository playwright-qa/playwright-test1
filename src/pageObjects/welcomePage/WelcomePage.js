import BaseComponent from "../../components/BaseComponent";
import BasePage from "../BasePage";
import SignupPopup from "./components/SignupPopup";
import SignInPopup from "./components/SigninPopup";

export default class WelcomePage  extends  BasePage {
    constructor(page) {
        super(page, '/')
        this.signUpBtn = page.locator('.hero-descriptor_btn');
        this.signInBtn = page.locator('.header_signin');
    }

    async clickOnSignUpBtn() {
        await this.signUpBtn.click();
        return new SignupPopup(this._page)
    }

    async clickOnSignInBtn() {
        await this.signInBtn.click();
        return new SignInPopup(this._page)
    }
}