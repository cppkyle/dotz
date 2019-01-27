class Game {
    constructor(sounds) {
	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
		
	this.sounds = sounds;
    this.possibleColors = ["red", "blue", "green"];
    this.chosenColor;
    this.balls = [];
	this.powerBalls = [];
    this.centerDiameter = 100;
    this.points = 0;
	this.pointStep = 1;
	this.resetPowerBallTimer();
	this.speed = 2;
    this.chooseColor();
	this.slowmo = false;
    }
	
    draw() {
        this.ctx.strokeStyle = 'rgba(0,0,0,0)';
		
        this.ctx.fillStyle = 'rgb(35, 35, 35)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.ctx.beginPath();
        this.ctx.arc(this.canvas.width/2, this.canvas.height/2, this.centerDiameter/2, 0, 2*Math.PI, false);
        this.ctx.fillStyle = this.chosenColor;
		this.ctx.fill();
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].update(this.centerDiameter);
            if (this.balls[i].isInMiddle) {
                if (this.balls[i].color == this.chosenColor) {
                    this.points += this.pointStep;
		    this.chooseColor();
                } else {
                    this.centerDiameter -= 2;
                }
		this.sounds[0].play();
                this.balls.splice(i, 1);
            }
        }
        for (var i = 0; i < this.powerBalls.length; i++) {
            this.powerBalls[i].update(this.centerDiameter);
            if (this.powerBalls[i].isOutside) {
                this.powerBalls.splice(i, 1);
            }
        }
        this.ctx.fillStyle = 'rgb(255,255,255)';
        this.ctx.textAlign = 'center';
		this.ctx.font = '35px arial';
        this.ctx.fillText(String(this.points), this.canvas.width / 2, this.canvas.height / 6);
	if (Math.floor(getRandom(45)) == 12) {
		this.createBall();
	}
	if (this.powerBallDelay <= Date.now() - this.powerBallStart) {
		this.resetPowerBallTimer();
		this.createPowerBall();
	}
	if (this.showingPopup) {
		if (2500 <= Date.now() - this.popupStart) {
			this.endPopup();
		} else {
			this.drawPopup();
		}
	}
	this.slowmoUpdate();
    }

    chooseColor() {
        var currentColor = this.chosenColor;
        var futureColor = this.possibleColors[Math.floor(getRandom(this.possibleColors.length))];
        while (futureColor == currentColor) {
            futureColor = this.possibleColors[Math.floor(getRandom(this.possibleColors.length))];
        }
        this.chosenColor = futureColor;
    }

    createBall() {
	/*
	   *side 1 = LEFT
	   *side 2 = TOP
	   *side 3 = RIGHT
	   *side 4 = BOTTOM
	*/
	var side = Math.floor(getRandom(1,4));
	if(side == 1) {
        	this.balls.push(new Ball(0, getRandom(this.canvas.height), this.possibleColors, this.ctx, this.canvas,this.speed));
	} else if(side == 2) {
		this.balls.push(new Ball(getRandom(this.canvas.width), 0, this.possibleColors, this.ctx, this.canvas,this.speed));
	} else if(side == 3) {
		this.balls.push(new Ball(this.canvas.width, getRandom(this.canvas.height), this.possibleColors, this.ctx, this.canvas,this.speed));
	} else if(side == 4) {
		this.balls.push(new Ball(getRandom(this.canvas.width), this.canvas.height, this.possibleColors, this.ctx, this.canvas,this.speed));
	} else {
		console.error("Side is invalid! With value of " + String(side));
	}
    }    

    createPowerBall() {
	/*
	   *side 1 = LEFT
	   *side 2 = TOP
	   *side 3 = RIGHT
	   *side 4 = BOTTOM
	*/
	var side = Math.floor(getRandom(1,4));
	console.log(side, Math.floor(getRandom(1,4)));
	if(side == 1) {
        	this.powerBalls.push(new PowerBall(0, getRandom(this.canvas.height), this.ctx, this.canvas));
	} else if(side == 2) {
		this.powerBalls.push(new PowerBall(getRandom(this.canvas.width), 0, this.ctx, this.canvas));
	} else if(side == 3) {
		this.powerBalls.push(new PowerBall(this.canvas.width, getRandom(this.canvas.height), this.ctx, this.canvas));
	} else if(side == 4) {
		this.powerBalls.push(new PowerBall(getRandom(this.canvas.width), this.canvas.height, this.ctx, this.canvas));
	} else {
		console.error("Side is invalid! With value of " + String(side));
	}
    }

    mouseClicked(event) {
        for (var i = 0; i < this.balls.length; i++) {
            if (this.balls[i].checkIfPressed(event.clientX,event.clientY)) {
                if (this.balls[i].color == this.chosenColor) {
                    this.chooseColor();
		    this.sounds[1].play();
                } else {
		    this.sounds[0].play();
		}
                this.balls.splice(i, 1);
            }
        }
        for (var i = 0; i < this.powerBalls.length; i++) {
            if (this.powerBalls[i].checkIfPressed(event.clientX,event.clientY,this)) {
		this.powerBalls[i].playSound(this.sounds);
                this.powerBalls.splice(i, 1);
            }
        }
    }

    resetPowerBallTimer() {
	this.powerBallStart = Date.now();
	this.powerBallDelay = Math.floor(getRandom(20000,40000));
    }

    slowmoUpdate() {
	if(this.slowmo == true) {
		if(6500 <= Date.now() - this.slowMoStart) {
			this.slowmo = false;
			this.speed = 2;
			for (var i = 0; i < this.balls.length; i++) {
				this.balls[i].speed = 2;
			}
		}
	}
    }

    createPopup(message) {
		this.showingPopup = true;
		this.popupMessage = message;
		this.popupStart = Date.now();
    }

    drawPopup() {
		this.ctx.fillStyle = 'rgb(255,255,255)';
		this.ctx.font = '20px arial';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.popupMessage, this.canvas.width/2, this.canvas.height/6 - this.canvas.height/10);
    }

    endPopup() {
	this.showingPopup = false;
    }
	

}