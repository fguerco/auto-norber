const login = require('./login');
const openBrowser = require('./open-browser');
const appConfig = require('./config.json');


async function executeAuthenticated(exec, siteUrl) {
    const [browser, page] = await openBrowser();
    await login(page, appConfig);
    try {
        await exec(page, appConfig.siteUrl);
    }
    finally {
        await browser.close();
    }
    
}

module.exports = executeAuthenticated;