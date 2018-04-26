import React from 'react';
import Display from './Display';

class Asteroids extends React.Component {
	constructor(){
		super();

		this.state = {
			px: 200,
			py: 200,
			pa: -90,
			pv: 0,
			accelerating: false,
			turnLeft: false,
			turnRight: false,
			firing: false,
			shots: []
		}

		this.handleKeyDown = (evt) => {
			evt.preventDefault();

			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;
			let ac = this.state.accelerating;

			if(evt.keyCode == 37 || evt.keyCode == 65)
				tl = true;
			if(evt.keyCode == 39 || evt.keyCode == 68)
				tr = true;
			if(evt.keyCode == 32)
				fg = true;
			if(evt.keyCode == 38 || evt.keyCode == 87)
				ac = true;

			this.setState({
				turnLeft: tl,
				turnRight: tr,
				firing: fg,
				accelerating: ac
			});
		}

		this.handleKeyUp = (evt) => {
			evt.preventDefault();

			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;
			let ac = this.state.accelerating;

			if(evt.keyCode == 37 || evt.keyCode == 65)
				tl = false;
			if(evt.keyCode == 39 || evt.keyCode == 68)
				tr = false;
			if(evt.keyCode == 32)
				fg = false;
			if(evt.keyCode == 38 || evt.keyCode == 87)
				ac = false;

			this.setState({
				turnLeft: tl,
				turnRight: tr,
				firing: fg,
				accelerating: ac
			});
		}

		this.gameLoop = () => {
			let px = this.state.px;
			let py = this.state.py;
			let pa = this.state.pa;
			let pv = this.state.pv;
			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;
			let ac = this.state.accelerating;
			let shots = this.state.shots;

			//Rotate player if turning
			if(tl)
				pa -= 10;
			if(tr)
				pa += 10;

			//Adjust player speed based on acceleration
			if(ac){
				pv+=.5;
				if(pv > 10)
					pv = 10;
			} else {
				pv-=.5;
				if(pv < 0)
					pv = 0;
			}


			//Move player, wrap if out of bounds
			px += pv * Math.cos(pa * Math.PI / 180);
			if(px > 400)
				px = 0;
			if(px < 0)
				px = 400;
			py += pv * Math.sin(pa * Math.PI / 180);
			if(py > 400)
				py = 0;
			if(py < 0)
				py = 400;

			//Fire bullets
			if(fg) {
				shots.push({sx: px, sy: py, sa: pa});
				console.log(shots);
			}

			//Update bullet positions
			for(var i = 0; i < shots.length; i++){
				shots[i].sx += 15 * Math.cos(shots[i].sa * Math.PI / 180);
				shots[i].sy += 15 * Math.sin(shots[i].sa * Math.PI / 180);
				if(shots[i].sx > 400 || shots[i].sx < 0 || shots[i].sy > 400 || shots[i].sy < 0)
					shots.splice(i, 1);
			}

			this.setState({
				px: px,
				py: py,
				pa: pa,
				pv: pv,
				shots: shots
			}); 
		}
	}

	componentDidMount(){
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
		let gameLoop = setInterval(this.gameLoop, 1000/20);
		this.setState({gameLoop: gameLoop});
	}

	componentWillUnmount(){
		//Garbage collection
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('keyup', this.handleKeyUp);
		clearInterval(this.state.gameLoop);
	}

	render(){
		return (
			<div>
				Asteroids
				<Display
					px={this.state.px}
					py={this.state.py}
					pa={this.state.pa}
					shots={this.state.shots}
				/>
			</div>
		);
	}
}

export default Asteroids;
