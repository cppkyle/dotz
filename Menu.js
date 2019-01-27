class Menu {
	constructor(highScore, lastScore) {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.highScore = highScore;
		this.lastScore = lastScore;
	}
	
	draw() {
		this.ctx.fillStyle = 'rgb(35, 35, 35)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.rectSize = [this.canvas.width/2, this.canvas.height - this.canvas.height/8, this.canvas.height/6, this.canvas.height/8];
		this.ctx.fillStyle = 'yellow';
		this.ctx.fillRect(this.rectSize[0] - this.rectSize[2]/2,this.rectSize[1] - this.rectSize[3]/2 ,this.rectSize[2],this.rectSize[3]);

		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = 'rgb(255, 255, 255)';
		this.ctx.font = '50px arial';
		this.ctx.fillText("Dotz", this.canvas.width/2, this.canvas.height/7);
		this.ctx.font = '35px arial';
		this.ctx.fillStyle = 'rgb(35, 35, 35)';
		this.ctx.fillText("Play", this.canvas.width/2, this.rectSize[1] + 35/3);
		this.ctx.fillStyle = 'rgb(255, 255, 255)';
		this.ctx.fillText("High Score: " + String(this.highScore), this.canvas.width/2, this.canvas.height/2);
		if (this.lastScore > 0) {
			this.ctx.fillText("Last Score: " + String(this.lastScore), this.canvas.width/2, this.canvas.height/2-45);
		}
	}
}
