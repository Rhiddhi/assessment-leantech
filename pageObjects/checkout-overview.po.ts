class CheckoutOverviewPage{
    get pageTitle(){
        return $('[data-test="title"]');
    }

    get inventoryItems(){
        return $$('[data-test="inventory-item"]');
    }

    get paymentInfo(){
        return $('[data-test="payment-info-value"]');
    }

    get shippingInfo(){
        return $('[data-test="shipping-info-value"]');
    }

    get totalCartValue(){
        return $('[data-test="subtotal-label"]')
    }

    get totalCheckoutValue(){
        return $('[data-test="total-label"]')
    }

    get finishButton(){
        return $('[data-test="finish"]');
    }
}

export default new CheckoutOverviewPage();