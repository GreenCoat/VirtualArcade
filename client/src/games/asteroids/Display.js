import React from 'react';

class Display extends React.Component {
	constructor(){
		super();

		this.state = {
			shipL: 10,
			shotSz: 1
		}
	}

	componentDidMount(){
		this.draw();
	}

	componentDidUpdate(){
		this.draw();
	}

	draw(){
		let px = this.props.px;
		let py = this.props.py;
		let pa = this.props.pa;
		let sl = this.state.shipL;
		let ss = this.state.shotSz;

		//Get canvas elements
		const canv = this.refs.canvas;
		const ctx = canv.getContext("2d");
		
		//Draws black canvas
		ctx.fillStyle='black';
		ctx.fillRect(0, 0, canv.width, canv.height);

		//Draw play
		ctx.strokeStyle='white';
		ctx.beginPath();
		ctx.moveTo(px - sl * Math.cos(30 + pa), py - sl * Math.sin(30 + pa));
		ctx.lineTo(px, py);
		ctx.lineTo(px + sl * Math.cos(30 + pa), py - sl * Math.sin(30 + pa));
		ctx.closePath();
		ctx.stroke();
	}

	render(){
		return (
			<div>
				<canvas ref='canvas' width='400' height='400'></canvas>
			</div>
		);
	}
}

export default Display;