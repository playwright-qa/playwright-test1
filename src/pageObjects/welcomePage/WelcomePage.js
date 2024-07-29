import BaseComponent from "../../components/BaseComponent";
import BasePage from "../BasePage";
import SignupPopup from "./components/SignupPopup";

export default class WelcomePage  extends  BasePage {
    constructor(page) {
        super(page, '/')
        this.signUpBtn = page.locator('.hero-descriptor_btn');
    }

    async clickOnSignUpBtn() {
        await this.signUpBtn.click();
        return new SignupPopup(this._page)
    }
}