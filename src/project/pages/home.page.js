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

    async isVisible() {
        await expect(this.elements.modal()).toBeVisible()
    }

    async clickOnSignUpBtn() {
        await this.elements.signUpBtn().click();
    }

    async cancelNewModification() {
        await this.elements.dontSwitchButton().click();
    }

    async close() {
        await this.elements.overlay().click({ position: { x: 0, y: 0 } });
    }

    async isHidden() {
        await expect(this.elements.modal()).toBeHidden();
    }

    async preselectedPackageName() {
        return await this.elements.preselectedPackage().innerText();
    }

    async proposedPackageName() {
        return await this.elements.proposedPackage().innerText();
    }

    async proposedPriceValue() {
        return await this.elements.proposedPrice().innerText();
    }

    async preselectedPriceValue() {
        return await this.elements.preselectedPrice().innerText();
    }
}