const express = require('express');
const path = require('path');
const Kahoot = require('kahoot.js-latest');
const bodyParser = require('body-parser');

const app = express();
const port = 2137;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "assets")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    app.get('/css/style.css', (req, res) => {
        res.type('text/css');
    });
});

app.post('/kahootForm', (req, res) => {
    const formData = req.body;
    const gamePin = formData.field1;
    const playerName = formData.field2;
    const howMany = formData.field3;
    const infoToDisplay = '<h1>kahootSpammer active</h1>';

    const bots = [];

    for (let i = 0; i < howMany; i++) {
        const client = new Kahoot();
        bots.push(client);

        client.join(gamePin, playerName + (i + 1));

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
    }
    res.send(infoToDisplay)


});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});