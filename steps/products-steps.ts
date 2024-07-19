import ProductPage from '../pageObjects/product-page.po';
import CartPage from '../pageObjects/cart-page.po';
import {scrollAndClickElem} from '../utils/commands';
/*
This class contains all necessary steps to validate Products page 
 select atleast three products from the list of items 
and navigate to checkout screen.
*/
class ProductSteps{

    async validatePageTitle(expectedPageTitle: string){
        let pagetitle = await ProductPage.pageTitle.getText();
        expect(pagetitle).toBe(expectedPageTitle); 
    }

    async validateProductPage(){
        // Atleast three products should be present
        expect(await ProductPage.products.length).toBeGreaterThanOrEqual(3);
        // All the products should have add to cart button present and enabled
        for(let product of await ProductPage.products){
            let addToCartButton = await product.$('button');
            expect(await addToCartButton.isDisplayed()).toBe(true);
            expect(await addToCartButton.isDisplayed()).toBe(true);
        }
        //Initially cart should be empty with no products
        expect(await ProductPage.shoppingCartBadge.isExisting()).not.toBe(true)
    }

    async removeAlreadyAddedProducts(){
        //This step will remove already added items from the list if any to restore ideal test condition
        for(let product of await ProductPage.products){
            let addToCartButton = await product.$('button');
            if((await addToCartButton.getAttribute('data-test')).split('-').includes('remove')){
                await scrollAndClickElem(addToCartButton);
            }
            
        }
    }

    async addProductToCart(expectedCartValue: string){
        //Get random product index between 0 and total (number of products - 1)
        let randomProductAddButton;
        let randomProductIndex;
        let isTrue=true;
        // This loop prevents from generating duplicate index and selecting same product multiple times
        while(isTrue){
            randomProductIndex = Math.floor(Math.random()*((await ProductPage.products.length - 1)-0+1)+0);
            randomProductAddButton = await ProductPage.products[randomProductIndex].$('button');
            if(((await randomProductAddButton.getAttribute('data-test')).split('-').includes('remove')) === false){
                isTrue=false;
            }
        }
        if(randomProductAddButton){
            await scrollAndClickElem(randomProductAddButton);
        }
        //Here cart badge will get updated with the total number of items in the cart
        expect(await ProductPage.shoppingCartBadge.getText()).toBe(expectedCartValue);
        //We will return the added item name for later comparison with the items in cart
        if(randomProductIndex !== undefined){
            let randomProductName = await ProductPage.products[randomProductIndex].$('[data-test="inventory-item-name"]').getText();
            return randomProductName;
        }
        
    }

    async navigateToCartAndValidate(cartPageUrl: string){
        await scrollAndClickElem(await ProductPage.shoppingCartLink);
        await CartPage.cartPageTitle.waitForDisplayed();
        expect(await browser.getUrl()).toContain(cartPageUrl);
    }

}

export default new ProductSteps()
