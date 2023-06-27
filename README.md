# Server side tagging - Alarm system

This is a backend system developed in Node.js that checks the server-side preview and provisioning servers for Google Tag Manager. It also sends out email notifications based on the status of the servers.

## Installation

1. Clone the repository:

   ```git clone https://github.com/your-username/NodeJS_SST_Alarms.git```
2. Install the dependencies:

   ```npm install```

  
## Configuration
1. Create a ```.env``` file in the root directory of the project.
2. Add the following environment variables to the ```.env```. file:
    ``` ADMIN="receiver emails"
    EMAIL="sender email"
    REFRESH_TOKEN=""
    CLIENT_SECRET=""
    CLIENT_ID=""
    ```
Replace the values in quotes with the appropriate email addresses and authentication credentials.

  
## Usage
1. Populate the ```data/list.json``` file with an array of objects representing the servers to monitor. Each object should have the following structure:
    ```
    {
        "name": "server name",
        "url": "https://url",
        "ts": "new Date()",
        "up": true
    }
    ````
Replace "server name" with the name of the server, "https://url" with the URL of the server, and "new Date()" with the timestamp of the server's status.

2. Start the application:
    ```
    npm start
    ```
    or
    ```
    pm2 start app.js
    ```
The application will continuously monitor the servers and send email notifications when necessary.

## License
This project is licensed under the MIT License.

