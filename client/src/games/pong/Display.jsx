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
     cxt.strokeStyle = "lime";
     cxt.strokeRect(0,0, canv.width, canv.height);
         
        // create player & ball
     if(this.props.gameOn){   
         
     cxt.fillStyle = "lime"; 
     cxt.fillRect(this.props.rectX, this.props.rectY, this.props.rectXSz, this.props.rectYSz);
     cxt.beginPath();
     cxt.arc(this.props.ballX, this.props.ballY, this.props.ballSz,0,2*Math.PI);
     cxt.fill();

     //Create game text
     cxt.font = "30px Arial";
     cxt.textAlign = "start";
     cxt.fillText(this.props.score,180,50);
     }  

     if(!this.props.gameOn){
            cxt.font='24px monospace';
            cxt.fillStyle='white';
            if(this.props.score == 0){
                cxt.fillText('Press any key to start', 45, canv.height/2);
            } else {
                cxt.fillText('Final Score: ' + this.props.score, 100, canv.height/2);
                cxt.fillText('Press any key to start', 45, canv.height/2 + 30);
            }
        }  
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