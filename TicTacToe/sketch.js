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

function setup() {
  createCanvas(400, 400);

  currentPlayer = floor(random(players.length));
  human = 0;
  ai = 1;

  console.log(ai, human);
  calcAvailable();
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
    }
    noLoop();
  } else {

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
    }
  }

  for (let i = 0; i < 3; i++) {
    if (equal3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  if (equal3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }

  if (equal3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
  }

  if (winner == false && available.length == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function MoveRand() {
  calcAvailable();
  
  if (available.length > 0) {
    let index = floor(random(available.length));
    let spot = available[index];
    let i = spot[0];
    let j = spot[1];

    board[i][j] = players[currentPlayer];
    currentPlayer = human;
  }
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
