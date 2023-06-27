/**
 * 3rd party libs
 */
// const fs = require('fs');
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
                    console.log(`${site.name} is down`)

                    return site
                }
                if (!site.up) {
                    sendNotification(site.url, "up")
                }

                site.up = true
                result.push(site)

                console.log(`${site.name} is up`)

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

const checkSingleServer = async (url) => {
    return new Promise(async (resolve, reject) => {
        let result = []
        
        // await Promise.all(sitelist.map( async site => {
        let site = {
            name: url,
            url: url,
            ts: new Date(),
            up: false
        }
        await axios.get(`${url}/healthz`)
        .then(({ data }) => {
            site.ts = new Date()
            if (data != "ok") {
                if (!site.up) {
                    return
                }
                if (site.up) {
                    // sendNotification(site.url, "down")
                }

                site.up = false
                result.push(site)
                console.log(`${site.name} is down`)

                return site
            }
            if (!site.up) {
                // sendNotification(site.url, "up")
            }

            site.up = true
            result.push(site)

            console.log(`${site.name} is up`)

            return resolve(site)
        })
        .catch(error => {
            if (!site.up) {
                return
            }
            if (site.up) {
                // sendNotification(site.url, "down")
            }
            site.ts = new Date()
            site.up = false
            result.push(site)
            return resolve(site)
        })
        // }))
        // resolve(result)
    })
}

module.exports = {
    checkServers,
    checkSingleServer
}