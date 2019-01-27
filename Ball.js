class Ball {
  constructor(x,y, availableColors, ctx, canvas, speed) {
	this.ctx = ctx;
	this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.color = availableColors[Math.floor(getRandom(availableColors.length))];
    this.diameter = 60;
    this.speed = speed;
    this.step = Math.atan2(this.canvas.height/2 - this.y,this.canvas.width/2 - this.x);
    this.isInMiddle = false;
  }

  show() {
	ctx.beginPath();
    ctx.arc(this.x,this.y,this.diameter/2,0,2*Math.PI,false);
    ctx.fillStyle = this.color;
	ctx.fill();
  }
  
  calculateCollision(centerDiameter) {
    this.distance = Math.floor(Math.hypot(canvas.width/2-this.x,canvas.height/2-this.y)) - (Math.floor(((centerDiameter/2) + (this.diameter/2))));
    if(this.distance <= 0) {
      this.isInMiddle = true;
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

  checkIfPressed(pressX,pressY) {
    if(pressX >= this.x - this.diameter/2 && pressX <= this.x + this.diameter/2 && pressY >= this.y - this.diameter/2 && pressY <= this.y + this.diameter/2) {
		return true;
    }
  }
}