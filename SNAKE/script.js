let canvas = document.getElementById('snake');
let pontosTela = document.querySelector('.pontuacao');
let finalJogo = document.querySelector('.fim');
let pontos = 0;
let context = canvas.getContext('2d');
let box = 32;
let snake = [];

snake[0] = {
	x: 10 * box,

	y: 10 * box
};
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
};
let direction = 'right';

function criarBG() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, 16 * box, 16 * box);
}

function placar() {
	pontos++;
	pontosTela.innerHTML = pontos;
}
function msgFinal() {
	finalJogo.innerHTML = 'Fim de Jogo';
}

function criarCobrinha() {
	for (i = 0; i < snake.length; i++) {
		if (i % 2 == 0) {
			context.fillStyle = 'green';
		} else {
			context.fillStyle = 'darkgreen';
		}
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function choque() {
	for (i = 0; i < snake.length; i++) {
		if (i % 2 == 0) {
			context.fillStyle = 'red';
		} else {
			context.fillStyle = 'darkred';
		}
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function desenhaComida() {
	context.fillStyle = 'red';
	context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
	if (event.key == 'ArrowLeft' && direction !== 'right') direction = 'left';
	if (event.key == 'ArrowUp' && direction !== 'down') direction = 'up';
	if (event.key == 'ArrowRight' && direction !== 'left') direction = 'right';
	if (event.key == 'ArrowDown' && direction !== 'up') direction = 'down';
}

function iniciarJogo() {
	if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
	if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
	if (snake[0].x < 0 * box && direction == 'left') snake[0].x = 16 * box;
	if (snake[0].y < 0 * box && direction == 'up') snake[0].y = 16 * box;

	criarBG();
	criarCobrinha();
	desenhaComida();
	for (i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			msgFinal();
			choque();
			clearInterval(jogo);
		}
	}
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (direction == 'right') snakeX += box;
	if (direction == 'left') snakeX -= box;
	if (direction == 'up') snakeY -= box;
	if (direction == 'down') snakeY += box;

	if (snakeX != food.x || snakeY != food.y) {
		snake.pop();
	} else {
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
		placar();
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	};
	snake.unshift(newHead);
}
let jogo = setInterval(iniciarJogo, 100);