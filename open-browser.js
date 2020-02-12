const puppeteer = require("puppeteer");

async function openBrowser() {
    const browserConfig = {
      headless: true,
      args: [ '--ignore-certificate-errors' ]
    };
  
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
  
    return [browser, page];
  }

  module.exports = openBrowser;