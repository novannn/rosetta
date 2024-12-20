// Snake Game Code
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

const gridSize = 20; // Size of each grid cell
const canvasSize = canvas.width; // Canvas width and height (400x400)
let snake, direction, food, score, intervalId;

function initializeGame() {
    // Initialize snake in the middle of the canvas
    snake = [{ x: canvasSize / 2, y: canvasSize / 2 }];
    direction = { x: gridSize, y: 0 }; // Moving right initially
    score = 0;
    placeFood();
    scoreElement.textContent = 'Score: 0';
    startButton.disabled = true; // Disable start button
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateGame, 100); // Update game every 100ms
}

// Place food randomly on the grid
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

// Update game state
function updateGame() {
    // Move snake in current direction
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check collision with walls or self
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head); // Add new head to the snake

    // Check if snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop(); // Remove the tail if no food eaten
    }

    drawGame();
}

// Draw game elements
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Clear canvas

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

// Handle keyboard input for direction
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -gridSize };
    if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: gridSize };
    if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -gridSize, y: 0 };
    if (key === 'ArrowRight' && direction.x === 0) direction = { x: gridSize, y: 0 };
});

// Start the game when the button is clicked
startButton.addEventListener('click', initializeGame);

// End the game
function endGame() {
    clearInterval(intervalId);
    startButton.disabled = false; // Enable start button
    alert(`Game Over! Your final score is: ${score}`);
}