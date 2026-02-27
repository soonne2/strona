const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');

let scores = []; 

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/scores', (req, res) => {
    res.json(scores.sort((a,b) => a.score - b.score).slice(0, 20));
});

app.post('/api/submit', (req, res) => {
    const { name, score } = req.body;
    if(name && score) {
        scores.push({ name, score: parseInt(score) });
        io.emit('update', true);
    }
    res.json({ success: true });
});

http.listen(3001, () => console.log('Bland app on port 3001'));
