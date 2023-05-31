/**
 * 3rd party libs
 */
const fs = require('fs');
const axios = require('axios')

/**
 * import/require json file with overview over our sites
 */
const sitelist = require('../data/list.json');
const { sendNotification } = require('./smtp');

/**
 * Check server status
 * @returns array of sites and their status
 */
const checkServers = async () => {
    return new Promise(async (resolve, reject) => {
        let result = []
        
        await Promise.all(sitelist.map( async site => {
            await axios.get(`${site.url}/healthz`)
            .then(({ data }) => {
                site.ts = new Date()
                if (data != "ok") {
                    if (!site.up) {
                        return
                    }
                    if (site.up) {
                        sendNotification(site.url, "down")
                    }

                    site.up = false
                    result.push(site)
                    return site
                }
                if (!site.up) {
                    sendNotification(site.url, "up")
                }

                site.up = true
                result.push(site)
                return site
            })
            .catch(error => {
                if (!site.up) {
                    return
                }
                if (site.up) {
                    sendNotification(site.url, "down")
                }
                site.ts = new Date()
                site.up = false
                result.push(site)
                return site
            })
        }))
        resolve(result)
    })
}

module.exports = {
    checkServers
}