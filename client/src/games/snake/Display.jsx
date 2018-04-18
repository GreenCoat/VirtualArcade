import React from 'react';

class Display extends React.Component {
	constructor(){
		super();

		this.gridSize = 20;
	}

	componentDidMount(){
		this.draw();
	}

	componentDidUpdate(){
		this.draw();
	}

	draw(){
		//Get canvas elements
		const canvas = this.refs.canvas;
		const context = canvas.getContext("2d");
		
		//Draws black canvas
		context.fillStyle='black';
		context.fillRect(0, 0, canvas.width, canvas.height);

		//Draws game start/game over message
		if(!this.props.gameOn){
			context.font='24px monospace';
			context.fillStyle='white';
			context.fillText('Press any key to start', 45, canvas.height/2);
		}

		//Draws player
		context.fillStyle='lime';
		context.fillRect((this.props.px*this.gridSize)+1, (this.props.py*this.gridSize)+1,this.gridSize-2,this.gridSize-2)
		for	(var i=0;i<this.props.trail.length;i++){
				context.fillRect((this.props.trail[i].x*this.gridSize)+1, (this.props.trail[i].y*this.gridSize)+1,this.gridSize-2,this.gridSize-2);
		}

		//Draws apple
		context.fillStyle='red';
		context.fillRect((this.props.ax*this.gridSize)+1, (this.props.ay*this.gridSize)+1, this.gridSize-2, this.gridSize-2);
	}

	render() {
		return (
			<div>
				<canvas ref='canvas' width='400' height='400'></canvas>
			</div>
		);
	}
}

export default Display;