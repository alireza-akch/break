// Define canvas dimensions
const canvasWidth = 800;
const canvasHeight = 600;

// Create canvas element
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

// Define paddle dimensions
const paddleWidth = 100;
const paddleHeight = 20;
const paddleSpeed = 10;

// Create paddle object
const paddle = {
  x: canvasWidth / 2 - paddleWidth / 2,
  y: canvasHeight - paddleHeight - 10,
  width: paddleWidth,
  height: paddleHeight,
  speed: paddleSpeed
};

// Keyboard event listeners to move the paddle
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && paddle.x > 0) {
    paddle.x -= paddle.speed;
  } else if (event.key === 'ArrowRight' && paddle.x + paddle.width < canvasWidth) {
    paddle.x += paddle.speed;
  }
});

// Define brick dimensions
const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 80;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Create bricks array
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Ball properties
const ballRadius = 10;
let ballX = canvasWidth / 2;
let ballY = canvasHeight - paddleHeight - ballRadius - 10;
let ballDX = 3;
let ballDY = -3;

// Game loop
function draw() {
  // Clear the canvas
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the bricks
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = '#0095DD';
        context.fill();
        context.closePath();
      }
    }
  }

  // Draw the paddle
  context.beginPath();
  context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();

  // Draw the ball
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();

  // Move the ball
  ballX += ballDX;
  ballY += ballDY;

  // Collision detection with bricks
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          ballX > brick.x &&
          ballX < brick.x + brickWidth &&
          ballY > brick.y &&
          ballY < brick.y + brickHeight
        ) {
          ballDY = -ballDY;
          brick.status = 0;
        }
      }
    }
  }

  // Collision detection with walls
  if (ballX + ballRadius > canvasWidth || ballX - ballRadius < 0) {
    ballDX = -ballDX;
  }
  if (ballY - ballRadius < 0) {
    ballDY = -ballDY;
  }

  // Collision detection with paddle
  if (
    ballX > paddle.x &&
    ballX < paddle.x + paddle.width &&
    ballY + ballRadius > paddle.y &&
    ballY + ballRadius < paddle.y + paddle.height
  ) {
    ballDY = -ballDY;
  }

  // Game over if ball hits the bottom wall
  if (ballY + ballRadius > canvasHeight) {
    alert('Game Over');
    document.location.reload();
  }

  requestAnimationFrame(draw);
}

// Start the game loop
draw();