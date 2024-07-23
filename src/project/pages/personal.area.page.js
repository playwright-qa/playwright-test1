import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class PersonalAreaPage {

    constructor(
        page
    ) {
        this.page = page;
    }


    elements = {
        logoutBtn: () => this.page.locator('.text-danger'),

    };

    async clickOnLogoutBtn() {
        await this.elements.logoutBtn().click();
    }
}