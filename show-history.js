const puppeteer = require("puppeteer");
const fs = require('fs');

const appConfig = JSON.parse(fs.readFileSync('config.json'));

async function main() {
  const browserConfig = {
    headless: true,
    args: [ '--ignore-certificate-errors', '--start-fullscreen']
  };

  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();

  await page.goto('https://norber.m4u/WebPonto/');
  await page.type('#CodEmpresa', '1');
  await page.type('#requiredusuario', appConfig.username);
  await page.type('#requiredsenha', appConfig.password);

  console.log('Logging in...');
  submit = await page.$('form[name="form"] input[type="submit"]');
  await submit.click();
  await page.waitForNavigation();
  console.log('Logged.');

  await page.goto('https://norber.m4u/WebPonto/just_user/justuser.asp');
  page.setViewport({ width: 1920, height: 3200 })
  await page.screenshot({path: 'history.png', fullPage: true})
  
  await browser.close()
}

main();