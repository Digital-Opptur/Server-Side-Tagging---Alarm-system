require('dotenv').config()

/**
 * 3rd party libs
 */
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    )
  
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })
}

// const accessTokenOld = await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((error, token) => {
//       if ( error ) {
//         reject("Failed to create access token")
//       }
//       resolve(token)
//     });
// })

const accessToken = () => {
    return new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((error, token) => {
            if ( error ) {
              reject("Failed to create access token")
            }
            resolve(token)
        });
    })
}

/**
 * Setup SMTP config
 */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})
const sendNotification = async (server, status) => {
    return new Promise(async (resolve, reject) => {
        let mailOptions = {
            from: process.env.USER,
            to: process.env.ADMIN,
            subject: `Your server is currently ${status}!`,
            html: `<h1>Server status changed for ${server} </h1>\nThe server is now ${status}!`,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return reject(error)
            }
            return resolve(true)
        });
    })
}

module.exports = {
    sendNotification
}