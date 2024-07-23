import { getRegistrationData } from "../utils/registration-data";
import { UserActions } from "../project/user-actions";
import { test } from '@playwright/test';

test.describe('Check registration form', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://qauto.forstudy.space/');
    });

    test('Register new customer and login', async ({ page }) => {
        const registrationData = getRegistrationData();
        const userActions = new UserActions(page);

        await userActions.registerNewCustomer(registrationData);
        await userActions.logout();
        await userActions.login(registrationData);
    });

    test('Check validation errors', async ({ page }) => {
        const registrationData = getRegistrationData();
        const userActions = new UserActions(page);

        await userActions.checkValidationErrors(registrationData);
        await userActions.logout();
        await userActions.login(registrationData);
    });
});