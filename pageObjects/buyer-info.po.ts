class BuyerInfoPage{
    get pageTitle(){
        return $('[data-test="title"]')
    }

    get continueButton(){
        return $('[data-test="continue"]')
    }

    get cancelButton(){
        return $('[data-test="cancel"]')
    }

    get buyerFirstNameInput(){
        return $('[data-test="firstName"]')
    }

    get buyerLastNameInput(){
        return $('[data-test="lastName"]')
    }

    get buyerZipCodeInput(){
        return  $('[data-test="postalCode"]');
    }
}

export default new BuyerInfoPage();