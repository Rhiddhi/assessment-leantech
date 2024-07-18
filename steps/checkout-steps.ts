import CartPage from '../pageObjects/cart-page.po';
import {scrollAndClickElem} from '../utils/commands';
import BuyerInfoPage from '../pageObjects/buyer-info.po';
import CheckoutOverviewPage from '../pageObjects/checkout-overview.po';
import CheckoutCompletePage from '../pageObjects/checkoutComplete.po';

class CheckoutSteps{
    async validateCartPageLayout(expectedPageTitle: string){
        // Validating page title
        expect(await CartPage.cartPageTitle.getText()).toBe(expectedPageTitle);

        // Validating necessary buttons to help user move forward to checkout or backward to product list
        expect(await CartPage.checkoutButton.isDisplayed()).toBe(true);
        expect(await CartPage.checkoutButton.isEnabled()).toBe(true);

        expect(await CartPage.continueShoppingButton.isDisplayed()).toBe(true);
        expect(await CartPage.continueShoppingButton.isEnabled()).toBe(true);
    }

    async validateProductsInCartPage(productListTitles: string[]){
        //Validating the added products from the products page in the list
        for(let item of await CartPage.inventoryItems){
            let itemTitle = await item.$('[data-test="inventory-item-name"]').getText();
            let itemRemoveButton = await item.$('button')
            expect(productListTitles).toContain(itemTitle);
            // Validate remove button is present to remove the added item
            expect(await itemRemoveButton.isDisplayed()).toBe(true);
        }
    }

    async navigateToBuyerInfoPage(buyerInfoPageUrl: string){
        await scrollAndClickElem(await CartPage.checkoutButton);
        await BuyerInfoPage.pageTitle.waitForDisplayed();
        expect(await browser.getUrl()).toContain(buyerInfoPageUrl);
    }

    async validateBuyerInfoPageLayout(expectedPageTitle: string){
         // Validating page title
         expect(await BuyerInfoPage.pageTitle.getText()).toBe(expectedPageTitle);

         // Validating necessary buttons - cancel and continue
         expect(await BuyerInfoPage.cancelButton.isDisplayed()).toBe(true);
         expect(await BuyerInfoPage.cancelButton.isEnabled()).toBe(true);
 
         expect(await BuyerInfoPage.continueButton.isDisplayed()).toBe(true);
         expect(await BuyerInfoPage.continueButton.isEnabled()).toBe(true);

         //Validating necessary input fields to input buyer information for successful purchase
         expect(await BuyerInfoPage.buyerFirstNameInput.isDisplayed()).toBe(true);
         expect(await BuyerInfoPage.buyerLastNameInput.isDisplayed()).toBe(true);
         expect(await BuyerInfoPage.buyerZipCodeInput.isDisplayed()).toBe(true);
    }

    async enterBuyerInformation(buyerFirstName: string , buyerLastName: string , buyerPostalCode: string){
        await BuyerInfoPage.buyerFirstNameInput.setValue(buyerFirstName);
        await BuyerInfoPage.buyerLastNameInput.setValue(buyerLastName);
        await BuyerInfoPage.buyerZipCodeInput.setValue(buyerPostalCode);
    }

    async proceedToCheckoutOverview(overviewPageUrl : string){
        await scrollAndClickElem(await BuyerInfoPage.continueButton);
        await CheckoutOverviewPage.pageTitle.waitForDisplayed();
        expect(await browser.getUrl()).toContain(overviewPageUrl);
    }

    async validateProductsInOverviewPage(productListTitles: string[]){
        for(let item of await CheckoutOverviewPage.inventoryItems){
            let itemTitle = await item.$('[data-test="inventory-item-name"]').getText();
            expect(productListTitles).toContain(itemTitle);
        }
    }

    async validateCheckoutInformations(){
        //Validating all necessary information for finishing purchase is displayed 
        expect(await CheckoutOverviewPage.paymentInfo.isDisplayed()).toBe(true);
        expect(await CheckoutOverviewPage.shippingInfo.isDisplayed()).toBe(true);
        expect(await CheckoutOverviewPage.totalCartValue.isDisplayed()).toBe(true);
        expect(await CheckoutOverviewPage.totalCheckoutValue.isDisplayed()).toBe(true);
    }

    async finishPurchaseAndValidate(successMessageHeader: string , successMessageBody: string){
        await scrollAndClickElem(await CheckoutOverviewPage.finishButton);
        await CheckoutCompletePage.successMessageHeader.waitForDisplayed();
        expect(await CheckoutCompletePage.successMessageHeader.getText()).toBe(successMessageHeader);
        expect(await CheckoutCompletePage.successMessageBody.getText()).toBe(successMessageBody);
        expect(await CheckoutCompletePage.backToHomeScreenButton.isDisplayed()).toBe(true);
    }

}

export default new CheckoutSteps();