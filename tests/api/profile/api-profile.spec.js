import {test, expect} from "../../../src/fixtures/myFixtures.js";

const mockedProfileData = {
    status: "success",
    data: {
        name: "Test",
        lastName: "Last",
        }
    }
test.describe('Profile Network', () => {
    test.beforeEach(async ({ page}) => {
        await page.goto('/panel/profile')
    })

test('Substitute response body and verify data on the page', async ({ page}) => {

    await page.route('api/users/profile', async route => {
        await route.fulfill({
            status: 200,
            json: mockedProfileData
        })
    })

    await page.reload()
    const profileName = await page.locator('.profile_name');
    await expect(profileName).toContainText('Test Last');
    });
});