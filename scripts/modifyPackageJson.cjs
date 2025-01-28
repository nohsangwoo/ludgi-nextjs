const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const backupPath = path.resolve(__dirname, '../package.json.bak');

function removeTypeField() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.type) {
    fs.writeFileSync(backupPath, JSON.stringify(packageJson, null, 2));
    delete packageJson.type;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Removed "type" field from package.json');
  }
}

function restoreTypeField() {
  if (fs.existsSync(backupPath)) {
    const backupJson = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    fs.writeFileSync(packageJsonPath, JSON.stringify(backupJson, null, 2));
    fs.unlinkSync(backupPath);
    console.log('Restored "type" field to package.json');
  }
}

const command = process.argv[2];
if (command === 'remove') {
  removeTypeField();
} else if (command === 'restore') {
  restoreTypeField();
} else {
  console.log('Invalid command. Use "remove" or "restore".');
} 