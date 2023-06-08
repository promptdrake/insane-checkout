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

app.get('/request/api/submit', (req, res) => {
    const nama = req.query.name
    const email = req.query.email
    const discord = req.query.discord
    const produk = req.query.product
    const pay = req.query.payment
    const id = req.query.id
    res.render('sure', { 
      nama: nama,
      email: email,
      discord: discord,
      produk: produk,
      pay: pay,
      id: id
     });
  });

module.exports = app;