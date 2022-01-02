require('dotenv/config');

const Client = require('./src/structures/Client');
const client = new Client();
client.login(process.env.TOKEN);
