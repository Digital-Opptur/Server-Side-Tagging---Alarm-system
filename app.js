require('dotenv').config()

/**
 * 3rd party libs
 */
const fs = require('fs');
const axios = require('axios')
const cron = require('node-cron')


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

cron.schedule('*/2 * * * *', () => {
    console.log('running a task every 2nd minute');
    checkServers()
    .then(data => {
        fs.writeFile('./data/list.json', JSON.stringify(data), err => {
            if (err) {
                console.error(err);
            }
            console.log("Wrote to file")
        });
    })
});



