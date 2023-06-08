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

app.get('/api/queue', (req, res) => {
  const id = req.query.id;
  fs.readFile('database.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const jsonData = JSON.parse(data);
    if (jsonData.length === 0) {
      res.json({ message: 'Database is empty' });
      return;
    }
    const record = jsonData.find((item) => item.id === id);
    if (record) {
      let sectionId;
      switch (record.queue) {
        case 'staffwait':
          sectionId = 'queue';
          console.log('[Client] Getting response from ' + record.id + ' With Status Code: Waiting staff responsed')
          break;
        case 'paymentrequired':
          sectionId = 'paymentship';
          console.log('[Client] Getting response from ' + record.id + ' With Status Code: Payment Required')
          break;
        case 'oncreate':
          sectionId = 'creating';
          console.log('[Client] Getting response from ' + record.id + ' With Status Code: On Created')
          break;
        case 'done':
          sectionId = 'alldone';
          console.log('[Client] Getting response from ' + record.id + ' With Status Code: All Done')
          break;
        case 'declined':
          sectionId = 'deny';
          console.log('[Client] Getting response from ' + record.id + ' With Status Code: Deny')
          break;
        default:
          sectionId = 'queue';
          console.log('[Client] Getting response from ' + record.id + ' With Status Code: Default Response')
          break;
      }
      record.message = record.message.replace(/\r\n/g, '<br>');
      res.render('queue', { dataid: record.id, sectionId, produk: record.produk, catatan: record.message });
    } else {
      res.json({ message: 'Data not found, Maybe Resubmit the form?', id: 'grizzly-need-honey' });
    }
  });
});

module.exports = app;