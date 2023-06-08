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
const fs = require('fs');
app.set('view engine', 'ejs');
const { v4: uuidv4 } = require('uuid');
app.use('/assets/', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const uuid = uuidv4();

app.post('/post/api/acceptform', (req, res) => {
    const { nama, email, discord, produk, payment, queue, message } = req.body;
    const id = payment[1];
  
    if (!dataenten(nama, id, email, discord, produk, payment, queue, message)) {
      simpennengdatabase({ nama, email, discord, produk, payment: payment[0], id: id, queue: queue, message: message });
      console.log('[SHIPPED] Make request With id '+ uuid + ' Response Value: '+ req.body)
      res.redirect('/./sukses?linkdata='+ id);
    } else {
      res.status(400).send('Internal Server Error, Maybe Data from /request/api/submit already exist<br>if this is Mistake, Contact Server administrator to fix this<hr>Session Id: '+uuid+'<br>Status: Failed Shipped database to sql <code>shop.aisbircubes.my.id/sql</code><br>Server: '+ req.hostname +'<br><br><code>Web Coded By Elitemc Development</code>');
      console.log('[POST-API] Failed To shipped data from '+ uuid);
    }
  });
  
  function simpennengdatabase(data) {
    const jsonData = JSON.parse(fs.readFileSync('database.json'));
    jsonData.push(data);
    fs.writeFileSync('database.json', JSON.stringify(jsonData, null, 2));
  }
  function dataenten(nama, email, discord, produk, payment, id, queue) {
    const jsonData = JSON.parse(fs.readFileSync('database.json'));
    return jsonData.some(entry => (
      entry.nama === nama &&
      entry.email === email &&
      entry.discord === discord &&
      entry.produk === produk &&
      entry.payment === payment &&
      entry.id === id &&
     entry.queue === queue
    ));
  }
  module.exports = app;