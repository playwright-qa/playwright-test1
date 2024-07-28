import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class HeaderMenu {

    constructor(page) {
        this.page = page;
        this.signInBtn = this.page.locator('.header_signin');
        this.myProfileBtn = this.page.locator('#userNavDropdown');
    }

    async clickOnSignInBtn() {
        await this.signInBtn.click();
    }

    async isMyProfileBtnVisible(){
        await expect(this.myProfileBtn).toBeVisible();
    }
}