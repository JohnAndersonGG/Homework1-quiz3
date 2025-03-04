const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];
let idCounter = 1;

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).send('Task title is required');
    }
    tasks.push({ id: idCounter++, title, description, completed: false });
    res.redirect('/');
});

app.post('/toggle-task/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    task.completed = !task.completed;
    res.redirect('/');
});

app.post('/delete-task/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
