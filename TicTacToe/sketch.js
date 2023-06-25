let board =
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

let available = [];
let players = ['X', 'O'];
let currentPlayer;

function setup() {
  createCanvas(400, 400);

  currentPlayer = floor(random(players.length));

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        available.push([i, j]);
      }
    }
  }
}

function draw() {
  background(230);
  strokeWeight(3);
  let w = width / 3;
  let h = height / 3;

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);

  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let spot = board[i][j];
      let x = (j * w) + w / 2;
      let y = (i * h) + h / 2;
      if (spot == players[0]) {
        xr = w / 4;
        strokeWeight(5);
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      } else if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      }
    }
  }
}

function NextTurn() {
  let index = floor(random(available.length));
  if (available.length > 0) {
    let spot = available.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];
    board[i][j] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
  }
}

function mousePressed() {
  NextTurn();
}