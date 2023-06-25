let board = 
[
  ['X', 'O', ''],
  ['', '', ''],
  ['', '', '']
]

function setup() {
  createCanvas(400, 400);
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
}
