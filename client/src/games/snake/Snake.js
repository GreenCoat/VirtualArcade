import React from 'react';
import Display from './Display';

class Snake extends React.Component {
	constructor(){
		super();

		this.state = {
			playerX: 4,
			playerY: 0,
			appleX: 15,
			appleY: 15,
			xVelocity: 1,
			yVelocity: 0,
			trail: [],
			tailLength: 5,
			tileCount: 20,
			gameOn: false,
			score: 0,
			finalScore: 0
		}

		this.changeVelocity = (evt) => {
			evt.preventDefault();
			let xv=this.state.xVelocity;
			let yv=this.state.yVelocity;
			let gameOn=this.state.gameOn;

			//Start game if game is not running on any keypress
			if(!this.state.gameOn){
				gameOn = true;
			}


			switch(evt.keyCode){
				case 37:
				case 65:
					if(xv!=1 ){
						xv=-1;
						yv=0;
					}
					break;
				case 38:
				case 87:
					if(yv!=1){
						xv=0;
						yv=-1;
					}
					break;
				case 39:
				case 68:
					if(xv!=-1){
						xv=1;
						yv=0;
					}
					break;
				case 40:
				case 83:
					if(yv!=-1){
						xv=0;
						yv=1;
					}
					break;
				default:
					xv=xv;
					yv=yv;
					break;
			}

			this.setState({
				xVelocity: xv,
				yVelocity: yv,
				gameOn: gameOn
			});
		}

		this.gameLoop = () => {
			if(this.state.gameOn){
				let px = this.state.playerX+this.state.xVelocity;
				let py = this.state.playerY+this.state.yVelocity;
				let ax = this.state.appleX;
				let ay = this.state.appleY;
				let tl = this.state.tailLength;
				let tc = this.state.tileCount;
				let trail = this.state.trail;
				let score = this.state.score;

				if(px<0){
					px=tc-1;
				}
				if(px>tc-1){
					px=0;
				}
				if(py<0){
					py=tc-1;
				}
				if(py>tc-1){
					py=0;
				}

				for(var i = 0; i < trail.length; i++){
					if(trail[i].x == px && trail[i].y == py){
						this.gameOver();
					}
				}

				if(px == ax && py == ay){
					tl++;
					score++;
					ax=this.newPosition();
					ay=this.newPosition();
				}


				trail.push({x: px, y: py});

				while(this.state.trail.length>this.state.tailLength){
			 		trail.shift();
				}

				if(this.state.gameOn){
					this.setState({
						playerX: px,
						playerY: py,
						appleX: ax,
						appleY: ay,
						trail: trail,
						tailLength: tl,
						score: score
					});
				}
			}
		}

		this.gameOver = () => {
			let finalScore = this.state.score;

			this.setState({
				playerX: this.newPosition(),
				playerY: this.newPosition(),
				appleX: this.newPosition(),
				appleY: this.newPosition(),
				xVelocity: 1,
				yVelocity: 0,
				trail: [],
				tailLength: 5,
				gameOn: false,
				score: 0,
				finalScore: finalScore
			});
		}

		this.newPosition = () => {
			let tc = this.state.tileCount;

			return Math.floor(Math.random()*tc);
		}
	}

	componentDidMount(){
		let gameLoop = setInterval(this.gameLoop, 1000/15);
		window.addEventListener('keydown', this.changeVelocity.bind(this));
		this.setState({gameLoop: gameLoop});

	}

	componentWillUnmount(){
		window.removeEventListener('keydown', this.changeVelocity.bind(this));
		clearInterval(this.state.gameLoop);
	}

	render(){
		return (
			<div id='snake' onKeyDown={this.changeVelocity}>
				<span style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}}>SNAKE</span>
				<Display 
					px={this.state.playerX}
					py={this.state.playerY}
					ax={this.state.appleX}
					ay={this.state.appleY}
					xv={this.state.xVelocity}
					xy={this.state.yVelocity}
					trail={this.state.trail}
					gameOn={this.state.gameOn}
					score={this.state.score}
					finalScore={this.state.finalScore}
				/>
			</div>
		)
	}
}

export default Snake;