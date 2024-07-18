class CartPage{
    get cartPageTitle(){
        return $('[data-test="title"]');
    }

    get inventoryItems(){
        return $$('[data-test="inventory-item"]')
    }

    get continueShoppingButton(){
        return $('[data-test="continue-shopping"]')
    }

    get checkoutButton(){
        return $('[data-test="checkout"]')
    }

}

export default new CartPage();