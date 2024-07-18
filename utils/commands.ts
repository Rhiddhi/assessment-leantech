/*
 This file contains combinations common commands which are frequently used together 
*/

export async function scrollAndClickElem(elem: WebdriverIO.Element){
    await elem.scrollIntoView({behavior: 'smooth' , block: 'center'});
    await elem.click();
}