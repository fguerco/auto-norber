const executeAuthenticated = require('./execute-authenticated');
const readline = require("readline")

function askForUser(inputText) {
  questionInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => questionInterface.question(inputText, answear => {
    questionInterface.close();
    resolve(answear);
  }))
}

async function main() {
  var initialDay = await askForUser('Data de inicio da assinatura do ponto (DD/MM/YYYY): ')
  var finalDay = await askForUser('Data do final da assinatura do ponto (DD/MM/YYYY): ')

  await executeAuthenticated(async (page, siteUrl) => {
    await page.goto(`${siteUrl}/Relatorios/SolicitaRelatorio.asp?Relatorio=RELRB03`);
    await page.evaluate((initialDay, finalDay) => {
      document.querySelector('#dtInicio').value = initialDay
      document.querySelector('#dtFim').value = finalDay
    }, initialDay, finalDay);
    await page.screenshot({path: 'history.png', fullPage: true});
  });
}

main();