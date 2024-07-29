import BaseComponent from "./BaseComponent";
import SignInPopup from "../pageObjects/welcomePage/components/SigninPopup";

export default class Header  extends  BaseComponent {
    constructor(page) {
        super(page)
        this.signInBtn = page.locator('.header_signin');
    }

    async clickOnSignInButton(){
        await this.signInBtn.click()
        return new SignInPopup(this._page)
    }
}