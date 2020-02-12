async function login(page, appConfig) {

    await page.goto(appConfig.siteUrl);
    await page.type('#CodEmpresa', appConfig.codEmpresa);
    await page.type('#requiredusuario', appConfig.username);
    await page.type('#requiredsenha', appConfig.password);
  
    console.log('Logging in...');
    submit = await page.$('form[name="form"] input[type="submit"]');
    await submit.click();
    await page.waitForNavigation();
    console.log('Logged.');
  
  }

module.exports = login