var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var inGame = false;
var sawTutorial = true;
var menu, game, tutorial, sounds, score;

init();

function init() {
    window.addEventListener('resize', resizeCanvas, false);
    canvas.addEventListener('pointerdown', mouseClicked, false);
    canvas.addEventListener('touchstart', mouseClicked, false);
    sounds = [new Audio('./click1.mp3'),new Audio('./wrong.mp3'),new Audio('./Ice.mp3'), new Audio('./Double.mp3')];
    score = localStorage.getItem('score');
    if (score === null) {
       score = 0;
    }
    menu = new Menu(score, 0);
    resizeCanvas();
    draw();
}

function draw() {
	if (inGame) {
		game.draw();
		if (game.centerDiameter <= 10) {
			if (game.points > score) {
				score = game.points;
				localStorage.setItem('score', game.points);
			}
			endPlaying(game.points);
		}
	} else {
		menu.draw();
		if (sawTutorial == false) {
			tutorial.draw();
		}
	}
	window.requestAnimationFrame(draw);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
}

function mouseClicked(event) {
	if (inGame) {	
		game.mouseClicked(event);
	} else if (sawTutorial == false) {
		if (event.clientX >= tutorial.rectSize[0] - tutorial.rectSize[2]/2 && event.clientX <= tutorial.rectSize[0] + tutorial.rectSize[2] && event.clientY >= tutorial.rectSize[1] - tutorial.rectSize[3]/2 && event.clientY <= tutorial.rectSize[1] + tutorial.rectSize[3]) {
			sawTutorial = true;
			menu = new Menu(score, canvas, ctx);
		} 		
	} else {
		if (event.clientX >= menu.rectSize[0] - menu.rectSize[2]/2 && event.clientX <= menu.rectSize[0] + menu.rectSize[2]/2 && event.clientY >= menu.rectSize[1] - menu.rectSize[3]/2 && event.clientY <= menu.rectSize[1] + menu.rectSize[3]/2) {
				startPlaying();
		}	
	}
}

function startPlaying() {
	inGame = true;
	game = new Game(sounds, canvas, ctx);
}

function endPlaying(lastScore) {
	inGame = false;
	menu = new Menu(score, lastScore);
}
