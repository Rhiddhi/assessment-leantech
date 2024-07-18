import LoginPage from '../pageObjects/login-page.po';
import ProductPage from '../pageObjects/product-page.po';
import {scrollAndClickElem} from '../utils/commands';
/*
    Class containing necessary steps for Login page validations and successful login process.
    Login flow has been done with valid username and password for positive scenario.
*/
class LoginSteps{
    async verifyLoginPage(expectedPageTitle: string){
        await LoginPage.openApplication();
        await LoginPage.loginPageTitle.waitForDisplayed();
        let pagetitle = await LoginPage.loginPageTitle.getText();
        expect(pagetitle).toBe(expectedPageTitle);
    }

    async enterUsername(username: string){
        expect(await LoginPage.inputUserName.isDisplayed()).toBe(true);
        await LoginPage.inputUserName.setValue(username);
    }

    async enterPassword(password: string){
        expect(await LoginPage.inputPassword.isDisplayed()).toBe(true);
        await LoginPage.inputPassword.setValue(password);
    }

    async clickOnSubmitButton(){
        expect(await LoginPage.submitButton.isDisplayed()).toBe(true);
        await scrollAndClickElem(await LoginPage.submitButton)
    }

    async validateSuccessfulSignIn(productPageUrl: string){
        await ProductPage.pageTitle.waitForDisplayed();
        if(await browser.isAlertOpen()){
            await browser.acceptAlert();
        }
        expect(await browser.getUrl()).toContain(productPageUrl);
    }

}

export default new LoginSteps();