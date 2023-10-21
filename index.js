const express = require('express')
const path = require("path");
const Kahoot = require("kahoot.js-latest");

const app = express()
const port = 2137
const client = new Kahoot();

app.use(express.static(path.join(__dirname, "assets")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(port, () => {
    console.log(`${port}`)
})

console.log("Joining kahoot...");
client.join(9802345 /* Or any other kahoot game pin */ , "kahoot.js");
client.on("Joined", () => {
    console.log("I joined the Kahoot!");
});
client.on("QuizStart", () => {
    console.log("The quiz has started!");
});
client.on("QuestionStart", question => {
    console.log("A new question has started, answering the first answer.");
    question.answer(0);
});
client.on("QuizEnd", () => {
    console.log("The quiz has ended.");
});