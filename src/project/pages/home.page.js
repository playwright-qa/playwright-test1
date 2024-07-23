import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class HomePage {

    constructor(
        page
    ) {
        this.page = page;
    }

    elements = {
        signUpBtn: () => this.page.locator('.hero-descriptor_btn'),

    };

    async clickOnSignUpBtn() {
        await this.elements.signUpBtn().click();
    }
}