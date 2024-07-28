import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class PersonalAreaPage {

    constructor(page) {
        this.page = page;
        this.logoutBtn = this.page.locator('.text-danger');
    }

    async clickOnLogoutBtn() {
        await this.logoutBtn.click();
    }
}