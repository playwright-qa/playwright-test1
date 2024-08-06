import BasePage from "../BasePage.js";

    export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, '/')
        this.addCarButton = page.locator('.btn-primary');
        this.addCarMilliage = page.locator('#addCarMileage');
        this.addBtnModal = page.locator('.modal-footer .btn-primary');
        this.carNameTitle = page.locator('.car_name');
        this.editCarBtn = page.locator('.car_actions .btn-edit');
        this.removeCarBtn = page.locator('.btn-outline-danger');
        this.confirmRemoveCar = page.locator('.modal-footer .btn-danger');
        this.emptyMessage = page.locator('.panel-empty_message');
        this.brandName = page.locator('#addCarBrand');
        this.modelName = page.locator('#addCarModel');
    }

        async addNewCar() {
            await this.addCarButton.click();
            await this.brandName.selectOption('BMW');
            await this.modelName.selectOption('5');
            await this.addCarMilliage.fill('123')
            await this.addBtnModal.click();
        }

        async clickOnEditCarBtn() {
            await this.editCarBtn.click();
        }

        async removeCar() {
            await this.clickOnEditCarBtn();
            await this.removeCarBtn.click();
            await this.confirmRemoveCar.click();
        }
}