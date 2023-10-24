const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({});
const { createBot, getRandomProxy, isNumeric, startServer } = require('./functions');
const getConfig = require('./config').getConfig();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

proxy.on('proxyReq', (proxyReq, req, res) => {
    proxyReq.setHeader('user-agent', 'KahootBot');
});

app.all('/kahoot/*', (req, res) => {
    proxy.web(req, res, {
        target: 'https://kahoot.it/',
    });
});

app.post('/kahootForm', async(req, res) => {
    const formData = req.body;
    const gamePin = formData.gamePin;
    const playerName = formData.playerName;
    const howManyBots = formData.howManyBots;
    const maxBotsToCreate = Math.min(howManyBots, 10);

    if (!isNumeric(gamePin)) {
        res.send('<h1>Invalid game ID. Please enter a numeric game ID.</h1>');
        return;
    }
    if (!isNumeric(howManyBots)) {
        res.send('<h1>Invalid number of bots. Please enter a numeric value.</h1>');
        return;
    }
    try {
        for (let i = 0; i < maxBotsToCreate; i++) {
            await createBot(i, gamePin, playerName);
        }
    } catch (err) {
        console.log(err);
    }
    res.send("bots send");
});

app.listen(getConfig.port, () => {
    console.log(`Server is running on port ${getConfig.port}`);
});
startServer();