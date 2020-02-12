
const executeAuthenticated = require('./execute-authenticated');

async function main() {
  await executeAuthenticated(async (page, siteUrl) => {
    await page.goto(`${siteUrl}/just_user/IncluirMarcacaoOnLine.asp`);

    console.log('Registering...')
    const okButton = await page.$('#Button1');
    await okButton.click();
    const date = new Date;
    console.log(`Done. Time: ${date.toLocaleTimeString()}`);
  
    await page.waitForNavigation();
  });
}

main();
