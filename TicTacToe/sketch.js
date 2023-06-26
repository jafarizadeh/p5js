let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let available = [];
let w, h;
let human, ai;
let players = ["X", "O"];
let currentPlayer;
let way;
let typeWin;
let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

function setup() {
  createCanvas(400, 400);

  // currentPlayer = floor(random(players.length));
  currentPlayer = 0;
  human = 1;
  ai = 0;

  calcAvailable();
  console.log(`Your Player ${players[human]}`);
}

function draw() {
  background(230);
  strokeWeight(3);
  w = width / 3;
  h = height / 3;
  drawBoard();
  let result = checkWinner();
  if (result != false) {
    if (result == "tie") {
      console.log("tie");
    } else {
      console.log(`Winner is ${result}`);
      drawEndLine(way);
    }
    noLoop();
  }

  if (currentPlayer == ai) {
    BestMove();
  }
}

function drawBoard() {
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);

  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let spot = board[i][j];
      let x = j * w + w / 2;
      let y = i * h + h / 2;
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

function calcAvailable() {
  available = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        available.push([i, j]);
      }
    }
  }
}

function equal3(a, b, c) {
  return a == b && a == c && a != "";
}

function checkWinner() {
  let winner = false;
  for (let i = 0; i < 3; i++) {
    if (equal3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
      way = { p1: [i, 0], p2: [i, 0] };
      typeWin = 1;
      // horizontally
    }
  }

  for (let i = 0; i < 3; i++) {
    if (equal3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
      way = { p1: [0, i], p2: [2, i] };
      typeWin = 2;
      // Vertically
    }
  }

  if (equal3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
    way = { p1: [0, 2], p2: [2, 0] };
    typeWin = 3;
    // diagonally "/"
  }

  if (equal3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
    way = { p1: [0, 0], p2: [2, 2] };
    typeWin = 4;
    // diagonally "\"
  }

  if (winner == false && available.length == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function BestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        board[i][j] = players[ai];
        let scores = minimax(board, false);
      }
    }
  }
}

function minimax (board, isMaximizing)
{

}

function drawEndLine(way) {
  let x1, x2, y1, y2;
  let p1 = way.p1;
  let p2 = way.p2;

  if (typeWin == 1) {
    x1 = w / 4;
    y1 = p1[0] * h + h / 2;
    x2 = width - w / 4;
    y2 = p1[0] * h + h / 2;
  }
  if (typeWin == 2) {
    x1 = p1[1] * w + w / 2;
    y1 = h / 4;
    x2 = p1[1] * w + w / 2;
    y2 = height - h / 4;
  }

  if (typeWin == 3) {
    x1 = width - w / 4;
    y1 = h / 4;
    x2 = w / 4;
    y2 = height - h / 4;
  }

  if (typeWin == 4) {
    x1 = w / 4;
    y1 = h / 4;
    x2 = width - w / 4;
    y2 = height - h / 4;
  }

  strokeWeight(25);
  stroke(255, 10, 10, 127);
  line(x1, y1, x2, y2);
}

function mousePressed() {
  let x, y;
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height &&
    currentPlayer == human
  ) {
    calcAvailable();
    x = floor(mouseX / w);
    y = floor(mouseY / h);

    if (board[y][x] == "") {
      board[y][x] = players[human];
      currentPlayer = ai;
    }
  }
}
