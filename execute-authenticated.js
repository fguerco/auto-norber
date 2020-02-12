const login = require('./login');
const openBrowser = require('./open-browser');
const appConfig = require('./config.json');


async function executeAuthenticated(exec) {
    const [browser, page] = await openBrowser();
    try {
        await login(page, appConfig);
        await exec(page, appConfig.siteUrl);
    }
    finally {
        await browser.close();
    }
    
}

module.exports = executeAuthenticated;