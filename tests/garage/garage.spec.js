import {test, expect} from "../../src/fixtures/myFixtures.js";

test.describe('Garage', () => {
    test.beforeEach(async ({ garagePage}) => {
        await garagePage.navigate()
    })

    test('should be able to add cat to garage', async ({garagePage}) => {
        await garagePage.addNewCar();
        await expect(garagePage.carNameTitle).toHaveText('BMW 5');
        await garagePage.removeCar();
        await expect(garagePage.emptyMessage).toBeVisible();
    });
})