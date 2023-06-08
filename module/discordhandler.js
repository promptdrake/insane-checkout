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

const express = require('express');
const ejs = require('ejs');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
app.set('view engine', 'ejs');
const { v4: uuidv4 } = require('uuid');
app.use('/assets/', express.static('public'));
const chalk = require('chalk');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const fs = require('fs');

app.get('/api/handler/dsc', (req, res) => {
  res.json({ message: 'This Api looks perfectly running', ApiEndpoint: '/api/handler/dsc'})
})
app.post('/api/handler/dsc', async (req, res) => {
  const webhookUrl = 'https://discord.com/api/webhooks/1055008295896748122/eGzKDrWaJpBcxk3NZjjUX6XtSC0chlnSVM88wDwjTUNjzy1fI0Pk7ZrISyzjFau9ECNy';
  const username = req.body.username;
  const id = req.body.insaneid;

  const message = {
    thread_name: 'New Request from '+ id,
    content: '@here',
    embeds: [
      {
        title: '`` New `` Request Baru Telah Dibuat',
        description: 'Harap sesegera mungkin merespon request ini di panel admin, client sedang menunggu di queue',
        fields: [
          {
            name: 'Dana / Gopay Nick: ',
            value: username
          },
          {
            name: 'Queue ID: ',
            value: id
          }
        ],
        color: 4360181,
        footer: {
          text: 'Aisbir Cube Store - https://aisbircubes.my.id',
          icon_url: 'https://cdn3.emoji.gg/emojis/3488_Idle_oxzy.png'
        },
        thumbnail: {
          url: 'https://cdn3.emoji.gg/emojis/5947-gift.png'
        },
        "components": [
          {
            "type": 2,
            "style": 5,
            "label": "Click Here",
            "url": "http://" + req.hostname + '/api/queue/?id=' + id
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(webhookUrl, message);
    console.log(chalk.yellow('[POST] ') + 'New Request To discord, check channel for details')
    res.redirect('http://'+req.hostname+'/api/queue?id=' + id)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the message to the webhook' });
  }
});

module.exports = app;
