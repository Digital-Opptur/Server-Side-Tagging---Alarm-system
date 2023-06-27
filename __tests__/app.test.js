const { sendNotification } = require("../libs/smtp");
const { checkServers, checkSingleServer } = require("../libs/watcher");

// test('Sends out email', async () => {
//     return sendNotification("https://jest.no", "up").then(data => {
//         expect(data).toBe(true);
//     })
// })

test('Checking servers', async () => {
    return checkServers().then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

test('Checking single server', async () => {
    return checkSingleServer('https://preview.gaitline.com').then(data => {
        expect(data.up).toBe(true)
    })
})