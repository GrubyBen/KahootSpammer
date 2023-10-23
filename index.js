process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

const express = require('express');
const path = require('path');
const Kahoot = require('kahoot.js-latest');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');

const app = express();
const port = 2137;
const proxyUrls = [
    'http://www.janvet.website.pl',
    'https://bramka-proxy.pl',
];

function getRandomProxy() {
    const randomIndex = Math.floor(Math.random() * proxyUrls.length);
    return proxyUrls[randomIndex];
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

const proxy = httpProxy.createProxyServer();

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

async function startServer() {
    try {
        const { default: fetch } = await
        import ('node-fetch');
        app.post('/kahootForm', async(req, res) => {
            try {
                const formData = req.body;
                const gamePin = formData.field1;
                const playerName = formData.field2;
                const howManyBots = formData.field3;
                const infoToDisplay = '<h1>kahootSpammer active</h1>';

                if (!isNumeric(gamePin)) {
                    res.send('<h1>Invalid game ID. Please enter a numeric game ID.</h1>');
                    return;
                }

                if (!isNumeric(howManyBots)) {
                    res.send('<h1>Invalid number of bots. Please enter a numeric value.</h1>');
                    return;
                }

                const bots = [];

                const createBot = async(i) => {
                    try {
                        const client = new Kahoot();
                        await client.join(gamePin, playerName + (i + 1));

                        client.on('Joined', () => {
                            console.log(`Bot ${i + 1} joined the Kahoot!`);
                        });

                        client.on('QuizStart', () => {
                            console.log(`Bot ${i + 1} says: The quiz has started!`);
                        });

                        client.on('QuestionStart', (question) => {
                            console.log(`Bot ${i + 1} says: A new question has started.`);
                            question.answer(0);
                        });

                        client.on('QuizEnd', () => {
                            console.log(`Bot ${i + 1} says: The quiz has ended.`);
                        });

                        bots.push(client);
                    } catch (err) {
                        console.error(`Error creating Bot ${i + 1}:`, err);
                    }
                };

                const maxBotsToCreate = Math.min(howManyBots, 10);

                for (let i = 0; i < maxBotsToCreate; i++) {
                    await createBot(i);
                }

                res.send(infoToDisplay);
            } catch (err) {
                console.error('Error processing Kahoot form submission:', err);
                res.status(500).send('An error occurred while processing your request.');
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
}

startServer();