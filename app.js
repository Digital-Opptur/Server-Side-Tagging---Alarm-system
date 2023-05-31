require('dotenv').config()

/**
 * 3rd party libs
 */
const fs = require('fs');
const axios = require('axios')


/**
 * import/require json file with overview over our sites
 */
const sitelist = require('./data/list.json');
const { checkServers } = require('./libs/watcher');
const { sendNotification } = require('./libs/smtp');

/**
 * Loop list in order to check their status
 * Runs every five minutes
 */

// sendNotification('https://preview.gaitline.com', 'down')

checkServers()
.then(data => {
    console.log(data)
    fs.writeFile('./data/list.json', JSON.stringify(data), err => {
        if (err) {
          console.error(err);
        }
        console.log("Wrote to file")
    });
})


