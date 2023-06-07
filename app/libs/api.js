const axios = require("axios")

const fetchSites = () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/list')
        .then(({data}) => {
            console.log("Listing sites:", JSON.stringify(data.data))
            if (data.status != "OK") {
                return resolve([])
            }
            return resolve(data.data)
        })
        .catch(error => {
            return reject(error)
        })
    })
}

module.exports = {
    fetchSites
}