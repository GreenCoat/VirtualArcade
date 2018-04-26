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
		let shots = this.props.shots;
		let sl = this.state.shipL;
		let ss = this.state.shotSz;

		//Get canvas elements
		const canv = this.refs.canvas;
		const ctx = canv.getContext("2d");
		
		//Draws black canvas
		ctx.fillStyle='black';
		ctx.fillRect(0, 0, canv.width, canv.height);

		//Draw player
		ctx.strokeStyle='white';
		ctx.beginPath();
		ctx.moveTo(px + (sl * Math.cos((pa+200) * Math.PI / 180)), py + (sl * Math.sin((pa+200) * Math.PI / 180)));
		ctx.lineTo(px, py);
		ctx.lineTo(px + (sl * Math.cos((pa-200) * Math.PI / 180)), py + (sl * Math.sin((pa-200) * Math.PI / 180)));
		ctx.closePath();
		ctx.stroke();

		//Draw bullets
		for(var i = 0; i < shots.length; i++){
			ctx.fillStyle='white';
			ctx.beginPath();
			ctx.arc(shots[i].sx, shots[i].sy, ss,0,2*Math.PI);
			ctx.fill();
		}
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