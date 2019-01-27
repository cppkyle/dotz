class PowerBall {
  constructor(x,y,ctx,canvas) {
	this.ctx = ctx;
	this.canvas = canvas;
    this.types = ["slow","double"];
    this.x = this.canvas.width/2;
    this.y = this.canvas.height/2;
    this.chooseTypeAndApplyColor();
    this.diameter = 60;
    this.speed = 5;
    this.step = Math.atan2(y - this.y,x - this.x);
    this.isOutside = false;
  }

  show() {
	this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.diameter/2,0,2*Math.PI,false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
	
	this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.diameter/4,0,2*Math.PI,false);
    this.ctx.fillStyle = 'rgb(35,35,35)';
    this.ctx.fill();
  }
  
  calculateCollision(centerDiameter) {
    if(this.x <= 0 || this.x >= this.canvas.width || this.y <= 0 || this.y >= this.canvas.height) {
      this.isOutside = true;
    }
  }

  move() {
    this.y = this.y + (Math.sin(this.step)*this.speed);
    this.x = this.x + (Math.cos(this.step)*this.speed);
  }

  update(centerDiameter) {
    this.move();
    this.calculateCollision(centerDiameter);
    this.show();
  }

  checkIfPressed(pressX,pressY,game) {
    if(pressX >= this.x - this.diameter/1.8 && pressX <= this.x + this.diameter/1.8 && pressY >= this.y - this.diameter/1.8 && pressY <= this.y + this.diameter/1.8) {
      	this.applyEffect(game);
	return true;
    }
  }

  chooseTypeAndApplyColor() {
    this.type = this.types[Math.floor(getRandom(this.types.length))];
    switch (String(this.type)) {
      case "slow":
        this.color = "cyan";
	break;
      case "double":
	this.color = "orange";
	break;
      default:
	console.error("chooseTypeAndApplyColor() did not choose valid type! Type is " + this.type);
     }
    }
  
  applyEffect(game) {
    switch (String(this.type)) {
      case "slow":
	game.createPopup("Slow-Motion");
        game.slowmo = true;
	game.slowMoStart = Date.now();
	game.speed = 1;
	for (var i = 0; i < game.balls.length; i++) {
				game.balls[i].speed = 1;
	}
	break;
      case "double":
	game.createPopup("Point Multiplier");
	game.pointStep *= 2;
	break;
      default:
	console.error("chooseTypeAndApplyColor() did not choose valid type! Type is " + this.type);
     }
  }

  playSound(sounds) {
   switch (String(this.type)) {
      case "slow":
	sounds[2].play();
	break;
      case "double":
	sounds[3].play();
	break;
      default:
	console.error("playSound(sounds) did not choose valid type! Type is " + this.type);
     }
  }
}
