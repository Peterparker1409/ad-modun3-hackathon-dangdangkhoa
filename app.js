// app.js
const apiUrl = 'http://localhost:3000';

const newPlayerForm = document.getElementById('newPlayerForm');
const playersTable = document.getElementById('playersTable');

// Hàm tạo bảng hiển thị thông tin người chơi
function createPlayersTable(players) {
  playersTable.innerHTML = `
    <table>
      <tr>
        <th>Player Name</th>
        <th>Score</th>
      </tr>
      ${players.map(player => `
        <tr>
          <td>${player.name}</td>s
          <td>${player.score}</td>
        </tr>
      `).join('')}
    </table>
  `;
}

// Hàm thêm người chơi mới
function addNewPlayer(event) {
  event.preventDefault();
  const formData = new FormData(newPlayerForm);
  const name = formData.get('name');
  const score = formData.get('score');

  fetch(`${apiUrl}/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score }),
  })
    .then(response => response.json())
    .then(player => {
      players.push(player);
      createPlayersTable(players);
      newPlayerForm.reset();
    })
    .catch(error => console.error('Error:', error));
}

// Lấy thông tin tất cả các người chơi
function getPlayers() {
  fetch(`${apiUrl}/players`)
    .then(response => response.json())
    .then(data => {
      players = data;
      createPlayersTable(players);
    })
    .catch(error => console.error('Error:', error));
}

// Xử lý khi form thêm người chơi được submit
newPlayerForm.addEventListener('submit', addNewPlayer);

// Khởi tạo bảng thông tin người chơi khi trang được load
getPlayers();
