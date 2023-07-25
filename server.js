// server.js

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const players = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/create-game', (req, res) => {
  const { player1, player2, player3, player4 } = req.body;
  players.push({
    name: player1,
    score: [],
  });
  players.push({
    name: player2,
    score: [],
  });
  players.push({
    name: player3,
    score: [],
  });
  players.push({
    name: player4,
    score: [],
  });

  res.redirect('/round');
});

app.get('/round', (req, res) => {
  const roundId = players[0].score.length;

  res.send(`
    <h1>Round ${roundId + 1}</h1>
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
          <th>Total Score</th>
        </tr>
      </thead>
      <tbody>
        ${players.map(player => `
          <tr>
            <td>${player.name}</td>
            <td>${player.score[roundId] || 0}</td>
            <td>${player.score.reduce((acc, curr) => acc + curr, 0)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <form action="/update-scores" method="post">
      ${players.map((player, index) => `
        <input type="number" name="score${index + 1}" placeholder="Score of ${player.name}">
      `).join('')}
      <button type="submit">Submit</button>
    </form>
    <form action="/new-round" method="post">
      <button type="submit">Start New Round</button>
    </form>
  `);
});

app.post('/update-scores', (req, res) => {
  players.forEach((player, index) => {
    player.score.push(parseInt(req.body[`score${index + 1}`]) || 0);
  });

  res.redirect('/round');
});

app.post('/new-round', (req, res) => {
  players.forEach(player => {
    player.score.push(0);
  });

  const roundId = players[0].score.length;
  res.send(`
    <h1>Round ${roundId + 1}</h1>
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
          <th>Total Score</th>
        </tr>
      </thead>
      <tbody>
        ${players.map(player => `
          <tr>
            <td>${player.name}</td>
            <td>${player.score[roundId] || 0}</td>
            <td>${player.score.reduce((acc, curr) => acc + curr, 0)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <form action="/update-scores" method="post">
      ${players.map((player, index) => `
        <input type="number" name="score${index + 1}" placeholder="Score of ${player.name}">
      `).join('')}
      <button type="submit">Submit</button>
    </form>
    <form action="/new-round" method="post">
      <button type="submit">Start New Round</button>
    </form>
  `);
});



// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
