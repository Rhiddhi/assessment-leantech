# Swag Labs Automation Test

This is the automation test framework with end to end flow validations for Sauce Labs demo application Swag Labs.

## Environment requirements 
This automation framework requires NodeJS version 16+ to be installed (preferred version NodeJs16 and NodeJS18). Please follow this [guide](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) to install NodeJS.

## Dependency Installation

This framework requires package manager [npm](https://www.npmjs.com/) to install required dependencies , 
npm comes installed with NodeJS so no need to install it separately. Run the following command from the project root directory : 

```bash
npm install
```

## Run tests

This framework user [WebdriverIO](https://webdriver.io/) as the main library for code automation . Please refer to the library [docs](https://webdriver.io/docs/gettingstarted) and [API](https://webdriver.io/docs/api) for further details.
Please use the following command from root directory to run tests :
```
npm run test:local
```

## Generating reports 
In order to generate report for the test execution we use [allure framework](https://allurereport.org/docs/). 
Please refer to the following usage information to install allure CLI globally on your machine and generate report  : 
```
1) Install allure CLI using command: 
npm install -g allure-commandline

2) After running tests using the Run tests instruction run the following command from project roor directory:
allure serve allure-results
```

##
