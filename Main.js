this.canvas = document.getElementById('canvas');
this.ctx = canvas.getContext('2d');
this.inGame = false;
this.sawTutorial = true;

this.init();

function init() {
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('pointerdown', mouseClicked, false);
    this.sounds = [new Audio('./click1.mp3'),new Audio('./wrong.mp3'),new Audio('./Ice.mp3'), new Audio('./Double.mp3')];
    this.score = localStorage.getItem('score');
    if (this.score === null) {
       this.score = 0;
    }
    this.menu = new Menu(this.score, 0);
    this.resizeCanvas();
    this.draw();
}

function draw() {
	if (inGame) {
		this.game.draw();
		if (this.game.centerDiameter <= 10) {
			if (this.game.points > this.score) {
				this.score = this.game.points;
				localStorage.setItem('score', this.game.points);
			}
			this.endPlaying(this.game.points);
		}
	} else {
		menu.draw();
		if (this.sawTutorial == false) {
			this.tutorial.draw();
		}
	}
	window.requestAnimationFrame(draw);
}

function resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
}

function mouseClicked(event) {
	if (this.inGame) {	
		this.game.mouseClicked(event);
	} else if (this.sawTutorial == false) {
		if (event.clientX >= this.tutorial.rectSize[0] - this.tutorial.rectSize[2]/2 && event.clientX <= this.tutorial.rectSize[0] + this.tutorial.rectSize[2] && event.clientY >= this.tutorial.rectSize[1] - this.tutorial.rectSize[3]/2 && event.clientY <= this.tutorial.rectSize[1] + this.tutorial.rectSize[3]) {
			this.sawTutorial = true;
			this.menu = new Menu(this.score, this.canvas, this.ctx);
		} 		
	} else {
		if (event.clientX >= this.menu.rectSize[0] - this.menu.rectSize[2]/2 && event.clientX <= this.menu.rectSize[0] + this.menu.rectSize[2]/2 && event.clientY >= this.menu.rectSize[1] - this.menu.rectSize[3]/2 && event.clientY <= this.menu.rectSize[1] + this.menu.rectSize[3]/2) {
				this.startPlaying();
		}	
	}
}

function startPlaying() {
	this.inGame = true;
	this.game = new Game(this.sounds, this.canvas, this.ctx);
}

function endPlaying(lastScore) {
	this.inGame = false;
	this.menu = new Menu(this.score, lastScore);
}
