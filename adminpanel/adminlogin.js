/*
 $$$$$$\  $$\           $$\       $$\            $$$$$$\            $$\                 
$$  __$$\ \__|          $$ |      \__|          $$  __$$\           $$ |                
$$ /  $$ |$$\  $$$$$$$\ $$$$$$$\  $$\  $$$$$$\  $$ /  \__|$$\   $$\ $$$$$$$\   $$$$$$\  
$$$$$$$$ |$$ |$$  _____|$$  __$$\ $$ |$$  __$$\ $$ |      $$ |  $$ |$$  __$$\ $$  __$$\ 
$$  __$$ |$$ |\$$$$$$\  $$ |  $$ |$$ |$$ |  \__|$$ |      $$ |  $$ |$$ |  $$ |$$$$$$$$ |
$$ |  $$ |$$ | \____$$\ $$ |  $$ |$$ |$$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$   ____|
$$ |  $$ |$$ |$$$$$$$  |$$$$$$$  |$$ |$$ |      \$$$$$$  |\$$$$$$  |$$$$$$$  |\$$$$$$$\ 
\__|  \__|\__|\_______/ \_______/ \__|\__|       \______/  \______/ \_______/  \_______|
                                                                                        
Copyright By AisbirCube Development
Stealing Project is not allowed, if u got exposed
we gonna takedown your website because this script
have Grizzly Protection
*/

const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser');
const axios = require('axios');
app.set('view engine', 'ejs');
const { v4: uuidv4 } = require('uuid');
app.use('/assets/', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const uuid = uuidv4();
const fs = require('fs');
const session = require('express-session');
const config = require('../config.js');
const database = JSON.parse(fs.readFileSync('database.json'));
const chalk = require('chalk');

// Set up session middleware
app.use(session({
  secret: 'aisbirgaming',
  resave: true,
  saveUninitialized: false
}));

// Login route
app.post('/panel/see', (req, res) => {
  const mailadmin = req.body.name;
  const passadmin = req.body.password;

  if (mailadmin === config.username && passadmin === config.password) {
    // Store the user's authentication status in the session
    req.session.loggedIn = true;
    req.session.username = mailadmin;

    console.log(chalk.red.bold('[LOG] ') + 'Someone Logged In to Admin Panel\n'+ chalk.green('Hash ID: ' + req.sessionID));

    // Redirect to the dashboard page after successful login
    res.redirect('/dashboard');
  } else {
    res.json({ message: 'Wrong Password' });
  }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  // Check if the user is logged in
  if (req.session.loggedIn) {
    res.render('dashboard', { data: database });
  } else {
    res.redirect('/auth/login/admin');
  }
});

app.get('/logout', (req, res) => {
  console.log(chalk.red.bold('[LOG] ') + 'Session Log Out\n'+ chalk.green('Hash ID: ' + req.sessionID));
  req.session.destroy();
  res.redirect('./dashboard')
});

  app.post('/panel/changedata/submit', (req,res) => {
const { id, status, message } = req.body;
  fs.readFile('database.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }
    try {
      const json = JSON.parse(data);
      const entry = json.find((item) => item.id === id);
      if (!entry) {
         return res.status(404).json({ message: 'Client Not Found, Sorry!'});
      }
      entry.queue = status;
      entry.message = message;
      fs.writeFile('database.json', JSON.stringify(json, null, 2), (err) => {
        if (err) {
          console.error(chalk.green('[Gateway] Error While Updating Database\n') + err);
          return res.status(500).send('Internal Server Error');
        }
        console.log(chalk.green('[Gateway] Updating Client Data\n'+req.body))
        res.sendFile(path.join(__dirname, '../sukses.html'));
      });
    } catch (err) {
      console.error(chalk.green('[Gateway] Error While Updating Database ') + err);
      return res.status(500).send('Internal Server Error');
    }
  });
  })
  app.get('/delete', (req, res) => {
    const emptyData = [];
    const jsonData = JSON.stringify(emptyData);
  if (req.session.loggedIn) {
    fs.writeFile('database.json', jsonData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred while deleting data.');
      } else {
        res.send('Data deleted successfully.');
      }
    });
  }
  else {
    res.json({ message: "You aren't logged in"})
  }
  });

module.exports = app;