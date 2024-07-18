class ProductPage{
    get pageTitle(){
        return $('[data-test="title"]');
    }

    get products(){
        return $$('[data-test="inventory-item"]')
    }

    get shoppingCartLink(){
        return $('[data-test="shopping-cart-link"]')
    }

    get shoppingCartBadge(){
        return $('[data-test="shopping-cart-badge"]')
    }
    
}

export default new ProductPage();