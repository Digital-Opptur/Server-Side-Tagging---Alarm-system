const { sendNotification } = require("../libs/smtp");
const { checkServers } = require("../libs/watcher");

test('Sends out email', async () => {
    return sendNotification("https://jest.no", "up").then(data => {
        expect(data).toBe(true);
    })
})

test('Checking servers', async () => {
    return checkServers().then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})