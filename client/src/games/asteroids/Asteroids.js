import React from 'react';
import Display from './Display';

class Asteroids extends React.Component {
	constructor(){
		super();

		this.state = {
			px: 200,
			py: 200,
			pa: -90,
			pv: 5,
			ma: -90,
			turnLeft: false,
			turnRight: false,
			firing: false
		}

		this.handleKeyDown = (evt) => {
			evt.preventDefault();

			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;

			if(evt.keyCode == 37 || evt.keyCode == 65)
				tl = true;
			if(evt.keyCode == 39 || evt.keyCode == 68)
				tr = true;
			if(evt.keyCode == 32)
				fg = true;

			this.setState({
				turnLeft: tl,
				turnRight: tr,
				firing: fg
			});
		}

		this.handleKeyUp = (evt) => {
			evt.preventDefault();

			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;

			if(evt.keyCode == 37 || evt.keyCode == 65)
				tl = false;
			if(evt.keyCode == 39 || evt.keyCode == 68)
				tr = false;
			if(evt.keyCode == 32)
				fg = false;

			this.setState({
				turnLeft: tl,
				turnRight: tr,
				firing: fg
			});
		}

		this.fire = () => {
			console.log('Pew');
		}

		this.gameLoop = () => {
			let px = this.state.px;
			let py = this.state.py;
			let pa = this.state.pa;
			let pv = this.state.pv;
			let tl = this.state.turnLeft;
			let tr = this.state.turnRight;
			let fg = this.state.firing;

			if(tl)
				pa -= 5;
			if(tr)
				pa += 5;

			px += pv * Math.cos(pa * Math.PI / 180);
			py += pv * Math.sin(pa * Math.PI / 180);

			if(fg)
				console.log('Pew');

			this.setState({
				px: px,
				py: py,
				pa: pa
			}); 
		}
	}

	componentDidMount(){
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
		let gameLoop = setInterval(this.gameLoop, 1000/15);
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
				/>
			</div>
		);
	}
}

export default Asteroids;
