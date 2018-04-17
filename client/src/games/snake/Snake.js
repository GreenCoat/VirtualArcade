import React from 'react';
import Display from './Display';

class Snake extends React.Component {
	constructor(){
		super();

		this.state = {
			playerX: 10,
			playerY: 10,
			appleX: 15,
			appleY: 15,
			xVelocity: 0,
			yVelocity: 0,
			trail: [],
			tailLength: 5,
			tileCount: 20
		}

		this.changeVelocity = (evt) => {
			evt.preventDefault();
			let xv=this.state.xVelocity;
			let yv=this.state.yVelocity;

			switch(evt.keyCode){
				case 37:
				case 65:
					xv=-1;
					yv=0;
					break;
				case 38:
				case 87:
					xv=0;
					yv=-1;
					break;
				case 39:
				case 68:
					xv=1;
					yv=0;
					break;
				case 40:
				case 83:
					xv=0;
					yv=1;
					break;
				default:
					xv=xv;
					yv=yv;
					break;
			}

			this.setState({
				xVelocity: xv,
				yVelocity: yv
			});
		}

		this.gameLoop = () => {
			let px = this.state.playerX+this.state.xVelocity;
			let py = this.state.playerY+this.state.yVelocity;
			let ax = this.state.appleX;
			let ay = this.state.appleY;
			let tl = this.state.tailLength;
			let tc = this.state.tileCount;

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

			if(px == ax && py == ay){
				tl++;
				ax=Math.floor(Math.random()*tc);
				ay=Math.floor(Math.random()*tc);
			}


			let trail = this.state.trail;
			trail.push({x: px, y: py});

			while(this.state.trail.length>this.state.tailLength){
			 	trail.shift();
			}

			this.setState({
				playerX: px,
				playerY: py,
				appleX: ax,
				appleY: ay,
				trail: trail,
				tailLength: tl
			});
		}
	}

	componentDidMount(){
		let gameLoop = setInterval(this.gameLoop, 1000/15);
		window.addEventListener('keydown', this.changeVelocity.bind(this));
		this.setState({gameLoop: gameLoop});

	}

	render(){
		return (
			<div id='snake' onKeyDown={this.changeVelocity}>
				SNAKE
				<Display 
					px={this.state.playerX}
					py={this.state.playerY}
					ax={this.state.appleX}
					ay={this.state.appleY}
					xv={this.state.xVelocity}
					xy={this.state.yVelocity}
					trail={this.state.trail}
					tail={this.state.tailLength}
				/>
			</div>
		)
	}
}

export default Snake;