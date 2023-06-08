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
const port = 80;
const path = require('path')
const bodyParser = require('body-parser');
const axios = require('axios');const chalk = require('chalk');
const fs = require('fs');
app.set('view engine', 'ejs');
const { v4: uuidv4 } = require('uuid');
app.use('/assets/', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const uuid = uuidv4();
const config = require('./config.js');


const readline = require('readline');


// Module Api
const postapi = require('./module/postapi');
const status = require('./module/status');
const queueapi = require('./module/easyqueue');

const discordhandler = require('./module/discordhandler')
app.use(postapi)
app.use(status)
app.use(queueapi)
app.use(discordhandler)

// Admin Panel Api
const authpanel = require('./adminpanel/adminlogin');
app.use(authpanel)


app.get('/auth/login/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/sukses', (req, res) => {
  const linkdata = req.query.linkdata
  const apiurl = '/api/queue?id='+linkdata
  if(!linkdata) {
    res.status(404).send('responded.datalink.notfound.message')
    console.log('[SHIPPED] /sukses data not found' + uuid)
  }
  res.render('shipped', { 
    link: apiurl
   });
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
  function cooldown() {
    const prefix = chalk.blue('[PACKAGE]');
    console.log(prefix + ` Importing All Api From ./adminpanel`);
    setTimeout(() => {
      console.log(prefix + ` Importing All Api From ./module`);
      setTimeout(() => {
        console.log(prefix + ` Importing config file ./config.js`);
        console.log(config)
        console.log('Config Ready!')
        setTimeout(() => {
          console.log(prefix + chalk.green(' Server Ready') + ` login to admin panel to see all submission /auth/login/admin`);
        }, 1000);
      }, 2000);
    }, 3000);
  }
  
  cooldown();
})