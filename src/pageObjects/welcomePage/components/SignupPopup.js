import BaseComponent from "../../../components/BaseComponent";


export default class SignupPopup extends BaseComponent {
    constructor(page) {
        super(page)
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.repeatPasswordField = page.locator('#signupRepeatPassword');
        this.registrationBtn = page.locator('.modal-footer .btn-primary');
        this.nameValidationMessage =  this.nameField.locator(' + .invalid-feedback');
        this.lastNameValidationMessage =  this.lastNameField.locator(' + .invalid-feedback');
        this.emailValidationMessage =  this.emailField.locator(' + .invalid-feedback');
        this.repeatValidationMessage =  this.repeatPasswordField.locator(' + .invalid-feedback')
    }

    async registerNewCustomer(registrationData) {
         await this.nameField.fill(registrationData.name);
         await this.lastNameField.fill(registrationData.last_name);
         await this.emailField.fill(registrationData.email);
         await this.passwordField.fill(registrationData.password);
         await this.repeatPasswordField.fill(registrationData.password);
         await this.registrationBtn.click();
    }
}