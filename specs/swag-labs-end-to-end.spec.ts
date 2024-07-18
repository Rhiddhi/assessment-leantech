import LoginSteps from '../steps/login-steps';
import Productsteps from '../steps/products-steps';
import CheckoutSteps from '../steps/checkout-steps';
import {data} from '../wdio.local.conf';

let validUsername=process.env.USER;
let validPassword=process.env.PASS;
const loginPageData = data.LoginPageData;
const productsPageData = data.productsPageData;
const cartPageData = data.cartPageData;
const buyerInfoPageData = data.buyerInfoPageData;
const checkoutOverviewPageData = data.checkoutOverviewPage;
const successPageData = data.successPageData;


let selectedProductTitles: string[]=[];

describe('End to end test to validate flow of adding and checking out items in application Swag Labs' , ()=>{
    it('Validate user has landed in Swg Labs login page and sucessfully logs into the application' , async ()=>{
         await LoginSteps.verifyLoginPage(loginPageData.pageTitle);
         if(validUsername){
            await LoginSteps.enterUsername(validUsername);
         }else{
            console.error("Invalid username passed");
         }
         if(validPassword){
            await LoginSteps.enterPassword(validPassword);
         }else{
            console.error("Invalid password passed")
         }
        await LoginSteps.clickOnSubmitButton();
        await LoginSteps.validateSuccessfulSignIn(productsPageData.pageUrl);
    })

    it('Validate products list page and select three products from the list' , async ()=>{
        await Productsteps.validatePageTitle(productsPageData.pageTitle);
        await Productsteps.validateProductPage();
        await Productsteps.removeAlreadyAddedProducts();
        //Selecting first product and pushing the product title into our array
        selectedProductTitles.push(await Productsteps.addProductToCart('1'));
        selectedProductTitles.push(await Productsteps.addProductToCart('2'));
        selectedProductTitles.push(await Productsteps.addProductToCart('3'));
    })

    it('Validate cart page and products added from Products page are displayed in the cart' , async ()=>{
      await Productsteps.navigateToCartAndValidate(cartPageData.pageUrl);
      await CheckoutSteps.validateCartPageLayout(cartPageData.pageTitle);
      await CheckoutSteps.validateProductsInCartPage(selectedProductTitles);
    })

    it('Validate buyer\'s information page and enter buyer information to proceed further to purchase added items' , async ()=>{
      await CheckoutSteps.navigateToBuyerInfoPage(buyerInfoPageData.pageUrl);
      await CheckoutSteps.validateBuyerInfoPageLayout(buyerInfoPageData.pageTitle);
      await CheckoutSteps.enterBuyerInformation(buyerInfoPageData.buyerFirstName , buyerInfoPageData.buyerLastName , buyerInfoPageData.buyerPostalCode);
    })

    it('Navigate to checkout overview page to validate final product detail , total cart value and finish purchase' , async () => {
      await CheckoutSteps.proceedToCheckoutOverview(checkoutOverviewPageData.pageUrl);
      await CheckoutSteps.validateProductsInOverviewPage(selectedProductTitles);
      await CheckoutSteps.validateCheckoutInformations();
      await CheckoutSteps.finishPurchaseAndValidate(successPageData.successMessageHeader , successPageData.successMessageBody);
    })
})