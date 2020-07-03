const path = require('path');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);
const localRegistryPath = path.join(appDir, 'local-registry.json');

async function registerLocally() {
  await createFileIfDoesNotExist();
  fs.readFile(localRegistryPath, 'utf8', async (error, jsonString) => {
    if (error) console.log(error)
    const localRegistry = JSON.parse(jsonString);
    await registerToday(localRegistry);
    showHoursWorkedIfNeeded(localRegistry);
  });
}

async function createFileIfDoesNotExist() {
  if (!fs.existsSync(localRegistryPath)) {
    const data = { date: '01/01/2020', hours: [] };
    fs.writeFile(localRegistryPath, JSON.stringify(data), writeError => {
      if (writeError) console.log(writeError);
    });
  }
}

async function registerToday(localRegistry) {
  if (localRegistry.date !== getDayOfYear()) {
    localRegistry.date = getDayOfYear();
    localRegistry.hours = [new Date()];
  } else localRegistry.hours.push(new Date());
  fs.writeFile(localRegistryPath, JSON.stringify(localRegistry), (err) => { 
    if (err) { console.log(err) }
  });
}

function getDayOfYear() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return year + "/" + month + "/" + day;
}

function showHoursWorkedIfNeeded(localRegistry) {
  if (localRegistry.hours.length === 4) {
    const launchTime = new Date(localRegistry.hours[2]) - new Date(localRegistry.hours[1]);
    const totalWorkedHoursInMilis = new Date(localRegistry.hours[3]) - new Date(localRegistry.hours[0]) - launchTime;
    console.log(`Time worked today: ${totalWorkedHoursInMilis/(1000 * 60 * 60)}`);
  }
}

module.exports = registerLocally;