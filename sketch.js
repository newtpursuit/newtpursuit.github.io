class Button {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colorI = 0;
    this.r = 48;
    this.selected = false;
  }
  
  show() {
    push();
    fill(colors[this.colorI]);
    noStroke();
    circle(this.x, this.y, this.r*2);
    pop();
  }
}


let buttons;
let completed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttons = [];
  buttons.push(new Button(width*1/4, height/2));
  buttons.push(new Button(width*3/8, height/2));
  buttons.push(new Button(width*1/2, height/2));
  buttons.push(new Button(width*5/8, height/2));
  buttons.push(new Button(width*3/4, height/2));
  colors  = [
    color(179, 64, 46), // Red
    color(201, 141, 197), // Pink
    color(212, 146, 32), // Orange
    color(216, 219, 118), // Yellow
    color(55, 128, 65), // Green
    color(71, 107, 161), // Blue
    color(93, 51, 130) // Purple
  ];
}

function draw() {
  background(220);
  if (completed) {
    push();
    textAlign(CENTER);
    textSize(32);
    contents = "Congratulations, you've completed my game!\nI had fun; I hope you feel the same\n\nHere's a reward:";
    text(contents, width/2, height/4);
    link = createA("https://drive.google.com/file/d/1sdZVz3KbyrMTyG3KWnmwP6IqBtVVg3D3/view", "Click Here");
    link.center();
    pop();
    noLoop();
    return;
  }
  // Color selectors
  for (let b of buttons) {
    b.show();
  }
  // Submit button
  push();
  rectMode(CENTER);
  noStroke();
  fill(100);
  rect(width/2, height*0.75, 128, 48);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("Submit", width/2, height*0.75+12);
  pop();
}

function mousePressed() {
  if (completed) {
    return;
  }
  // Handle color selectors
  for (let b of buttons) {
    if (dist(mouseX, mouseY, b.x, b.y) <= b.r) {
      b.colorI = (b.colorI + 1) % colors.length;
    }
  }
  // Handle submit button
  if (mouseX >= width/2-64 && mouseX <= width/2+64 && mouseY >= height*0.75-24 && mouseY <= height*0.75+24) {
    submit();
  }
}

function submit() {
  if (buttons[0].colorI == 0 & buttons[1].colorI == 1 && buttons[2].colorI == 5 && buttons[3].colorI == 4 && buttons[4].colorI == 6) {
    completed = true;
  } else {
    alert("Try again");
  }
}
