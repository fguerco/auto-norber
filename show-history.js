const executeAuthenticated = require('./execute-authenticated');

async function main() {
  await executeAuthenticated(async (page, siteUrl) => {
    await page.goto(`${siteUrl}/just_user/justuser.asp`);
    page.setViewport({ width: 1920, height: 3200 });
    await page.screenshot({path: 'history.png', fullPage: true});
  });
}

main();