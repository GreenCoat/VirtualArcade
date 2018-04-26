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
			shots: [],
			asteroids: [],
			gameOn: false,
			difficulty: 20
		}

		this.handleKeyDown = (evt) => {
			evt.preventDefault();

			if(!this.state.gameOn){
				this.gameStart();
			}
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
			let gameOn = this.state.gameOn;
			if(gameOn){
			let px = this.state.px;
			let py = this.state.py;
			let pa = this.state.pa;
			let pv = this.state.pv;
			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;
			let ac = this.state.accelerating;
			let shots = this.state.shots;
			let asteroids = this.state.asteroids;

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
			}

			//Check if any bullets are hitting asteroids
			for(var i = 0; i < shots.length; i++){
				for(var j = 0; j < asteroids.length; j++){
					if(asteroids[j].size >= Math.abs(shots[i].sx - asteroids[j].ax) && asteroids[j].size >= Math.abs(shots[i].sy - asteroids[j].ay)){
						shots.splice(i, 1);
						asteroids.splice(j, 1);
					}
				}
			}

			//Check if no more asteroids
			if(asteroids.length == 0){
				this.nextRound();
			}

			//Update bullet positions
			for(var i = 0; i < shots.length; i++){
				shots[i].sx += 15 * Math.cos(shots[i].sa * Math.PI / 180);
				shots[i].sy += 15 * Math.sin(shots[i].sa * Math.PI / 180);
				if(shots[i].sx > 400 || shots[i].sx < 0 || shots[i].sy > 400 || shots[i].sy < 0)
					shots.splice(i, 1);
			}

			//Move Asteroids, wrapping if needed
			for(var i = 0; i < asteroids.length; i++){
				asteroids[i].ax += asteroids[i].as * Math.cos(asteroids[i].aa * Math.PI / 180);
				asteroids[i].ay += asteroids[i].as * Math.sin(asteroids[i].aa * Math.PI / 180);
				if(asteroids[i].ax > 400)
					asteroids[i].ax = 0;
				if(asteroids[i].ax < 0)
					asteroids[i].ax = 400;
				if(asteroids[i].ay > 400)
					asteroids[i].ay = 0;
				if(asteroids[i].ay < 0)
					asteroids[i].ay = 400;
				//Check if they hit the player
				if(asteroids[i].size >= Math.abs(px - asteroids[i].ax) && asteroids[i].size >= Math.abs(py - asteroids[i].ay))
					this.gameOver();
			}


			if(gameOn && asteroids.length > 0){
			this.setState({
				px: px,
				py: py,
				pa: pa,
				pv: pv,
				shots: shots,
				asteroids: asteroids
			}); 
			}
			}
		}

		this.gameStart = () => {
			this.nextRound();

			this.setState({
				gameOn: true
			});
		}

		this.gameOver = () => {
			this.setState({
				px: 200,
				py: 200,
				pa: -90,
				pv: 0,
				accelerating: false,
				turnLeft: false,
				turnRight: false,
				firing: false,
				shots: [],
				asteroids: [],
				gameOn: false,
				difficulty: 20
			});
		}

		this.nextRound = () => {
			let dif = this.state.difficulty;
			let a = [];

			//Increase difficulty
			dif += dif/2;

			//Determine number of asteroids
			let large = Math.floor(dif/10);

			for(var i = 0; i < large; i++){
				a.push(this.getAsteroid(10));
			}

			this.setState({
				asteroids: a,
				difficulty: dif
			});
		}

		this.getAsteroid = (size) => {
			let aster = {};
			aster.ax = this.getLocation('x');
			aster.ay = this.getLocation('y');
			aster.aa = Math.floor(Math.random() * 360);
			aster.size = size;
			switch(size){
				case size = 10:
					aster.as = 3;
					break;
				case size = 5:
					aster.as = 6;
					break;
				case size = 2:
					aster.as = 10;
					break; 
			}

			return aster;
		}

		this.getLocation = (vect) => {
			let px = this.state.px;
			let py = this.state.py;

			let cord = Math.floor(Math.random() * 400);
			switch(vect){
				case 'x':
					if(Math.abs(px - cord) < 30)
						cord = this.getLocation('x');
					break;
				case 'y':
					if(Math.abs(py - cord) < 30)
						cord = this.getLocation('y');
					break;
			}

			return cord;
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
				<span style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}}>ASTEROIDS</span>
				<Display
					px={this.state.px}
					py={this.state.py}
					pa={this.state.pa}
					shots={this.state.shots}
					aster={this.state.asteroids}
					gameOn={this.state.gameOn}
				/>
			</div>
		);
	}
}

export default Asteroids;
