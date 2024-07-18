class CheckoutCompletePage{
    get successMessageHeader(){
        return $('[data-test="complete-header"]');
    }

    get successMessageBody(){
        return $('[data-test="complete-text"]');
    }

    get backToHomeScreenButton(){
        return $('[data-test="back-to-products"]');
    }
}

export default new CheckoutCompletePage();