import { config as sharedConfig } from './wdio.shared.conf'
import path from 'path'

const fs = require('fs');
const dotenv=require('dotenv');

//Environmental configuration data 
dotenv.config({path:`${__dirname}/config.env`});

//Test Data
const dataFilePath = path.join(__dirname , './data/test-data.json');

export const data  = JSON.parse(fs.readFileSync(dataFilePath));

export const config = {
    ...sharedConfig,
    ...{
        capabilities: [{
        browserName: 'chrome',
        'acceptInsecureCerts': true,
        'goog:chromeOptions': {
            args: ['--start-maximized']
        }
        }],
        reporters: ['spec',['allure', {
            outputDir: 'allure-results',
            disableWebdriverScreenshotsReporting: false,
            disableWebdriverStepsReporting: true,
        }]]
    }
}
