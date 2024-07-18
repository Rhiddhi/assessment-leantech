class LoginPage{
    get loginPageTitle(){
        return $('.login_logo');
    }

    get inputUserName(){
        return $('[data-test="username"]');
    }

    get inputPassword(){
        return $('[data-test="password"]');
    }

    get submitButton(){
        return $('[data-test="login-button"]');
    }

    async openApplication(){
        await browser.url('');
    }
}

export default new LoginPage();