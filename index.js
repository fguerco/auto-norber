const puppeteer = require("puppeteer");
const fs = require('fs');

const appConfig = JSON.parse(fs.readFileSync('config.json'));

async function main() {
  const browserConfig = {
    headless: true,
    args: [ '--ignore-certificate-errors' ]
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

  await page.goto('https://norber.m4u/WebPonto/just_user/IncluirMarcacaoOnLine.asp');

  console.log('Registering...')
  const okButton = await page.$('#Button1');
  await okButton.click();
  console.log('Done.');

  await page.waitForNavigation();

  await browser.close();
}

main();
