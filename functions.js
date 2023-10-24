const Kahoot = require('kahoot.js-latest');
const config = require('./config').getConfig();
const httpProxy = require('http-proxy');

async function startServer() {
    try {
        const { default: fetch } = await
        import ('node-fetch');
    } catch (err) {
        console.error('Error starting the server:', err);
    }
}
async function createBot(i, gamePin, playerName) {
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

    } catch (err) {
        console.error(`Error creating Bot ${i + 1}:`, err);
    }
};

function getRandomProxy() {
    const randomIndex = Math.floor(Math.random() * getConfig.length);
    return getConfig[randomIndex];
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

module.exports = { createBot, getRandomProxy, isNumeric, startServer }