import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class HeaderMenu {

    constructor(
        page
    ) {
        this.page = page;
    }


    elements = {
        signInBtn: () => this.page.locator('.header_signin'),
        myProfileBtn: () => this.page.locator('#userNavDropdown'),

    };

    async clickOnSignInBtn() {
        await this.elements.signInBtn().click();
    }

    async isLoginSuccess(){
        await expect(this.elements.myProfileBtn()).toBeVisible();
    }
}