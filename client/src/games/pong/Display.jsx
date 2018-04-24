import React from 'react';
class Display extends React.Component {
    
	constructor() {
		super();
     
    }
    
    componentDidMount(){
        this.draw();
    }
    
    componentDidUpdate(){
        this.draw();        
    }
    
    draw(){
        // create background using canvas
     const canv = this.refs.canvas;
     const cxt = canv.getContext("2d");
     cxt.fillStyle = "black";    
     cxt.fillRect(0,0, canv.width, canv.height);
         
        // create player & ball
         
     cxt.fillStyle = "lime"; 
     cxt.fillRect(this.props.rectX, this.props.rectY, this.props.rectXSz, this.props.rectYSz);
     cxt.beginPath();
     cxt.arc(this.props.ballX, this.props.ballY, this.props.ballSz,0,2*Math.PI);
     cxt.fill();
     cxt.font = "30px Arial";
     cxt.textAlign = "start";
     cxt.fillText(this.props.lives,150,50);    
    }
    
    render() {
		return (
            <div>
                <canvas ref='canvas' width="400" height="400" onMouseMove={(e) => this.props.mouseMove(this.refs.canvas, e)}></canvas>

            </div>
        )
        
    
    
    }
}

export default Display;