const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk')
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log(chalk.green("           _     _     _         _____      _               "));
console.log(chalk.magenta("     /\\   (_)   | |   (_)       / ____|    | |              "));
console.log(chalk.red("    /  \\   _ ___| |__  _ _ __  | |    _   _| |__   ___  ___ "));
console.log(chalk.blue("   / /\\ \\ | / __| '_ \\| | '__| | |   | | | | '_ \\ / _ \\/ __|"));
console.log(chalk.cyan("  / ____ \\| \\__ \\ |_) | | |    | |___| |_| | |_) |  __/\\__ \\"));
console.log(chalk.grey(" /_/    \\_\\_|___/_.__/|_|_|     \\_____|\\__,_|_.__/ \\___||___/"));
console.log('')
console.log('Welcome To Checkout panel auto configuration scripts')
console.log('Please Read, If you running on ubuntu vps, you need add ssl')
console.log('Thanks for buying My Checkout script -aisbir')
console.log('')
const configPath = './config.js';
const config = require(configPath);

function promptUsername() {
  rl.question('Enter your Admin Username: ', (username) => {
    if (username.trim() === '') {
      console.log(chalk.red('\n**Username cannot be empty. Please try again.**\n'));
      promptUsername();
      return;
    }

    config.username = username;
    promptPassword();
  });
}

function promptPassword() {
  rl.question('Enter your Admin Password: ', (password) => {
    if (password.trim() === '') {
      console.log(chalk.red('\n**Password cannot be empty. Please try again.**\n'));
      promptPassword();
      return;
    }

    config.password = password;
    promptWebhook();
  });
}
function promptWebhook() {
  rl.question('Enter your Webhook Url: ', (webhook) => {
    if (webhook.trim() === '') {
      console.log(chalk.red('\n**Webhook cannot be empty. Please try again.**\n'));
      promptWebhook();
      return;
    }

    config.webhook = webhook;
    promptStorename();
  });
}
function promptStorename() {
  rl.question('Enter your Store Name: ', (storename) => {
    if (storename.trim() === '') {
      console.log(chalk.red.bold('\n**Your Store Name cannot be empty. Please try again.**\n'));
      promptStorename();
      return;
    }
console.log(chalk.bgCyan('\n🚀 Hello new store admin for ' + storename)+ '\n\nThis is Your config file, if you forgot your password you can type again npm run autoconfig')
    config.storename = storename;
    updateConfiguration();
  });
}

function updateConfiguration() {
  fs.writeFile(configPath, `module.exports = ${JSON.stringify(config, null, 2)};`, (err) => {
    if (err) {
      console.error('Failed to update the configuration:', err);
      rl.close();
      return;
    }
console.log(config)
console.log(chalk.green('[CONFIG] Config Updated!'));
setTimeout(() => {
  console.log(chalk.cyan('[MODULE] Installing all Required Module'));
  exec('npm i', (error, stdout, stderr) => {
    if (error) {
      console.error('Failed to run:', error);
    } else {
      console.log(chalk.cyan('[MODULE] Succesfully Installing all Packages Please type npm start'));
    }
    rl.close();
  });
}, 5000);
  });
}

promptUsername();
