const express = require('express');
const path = require('path');
const Kahoot = require('kahoot.js-latest');
const bodyParser = require('body-parser');

const app = express();
const port = 2137;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/kahootForm', (req, res) => {
    const formData = req.body;
    const fieldId = formData.field1;
    const playerName = formData.field2;
    const howMany = formData.field3;

    const bots = [];

    for (let i = 0; i < howMany; i++) {
        const client = new Kahoot();
        bots.push(client);

        client.join(fieldId, playerName + ' Bot ' + (i + 1));

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

    res.send('Form submitted successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});