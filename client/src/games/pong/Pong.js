import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import Display from "./Display";


class Pong extends React.Component {
    constructor() {
        super();
        this.state = {
            ballX: 300,
            ballY: 300,
            ballSz: 10,
            ballXV: 10,
            ballYV: 5,
            rectX: 50,
            rectY: 200,
            rectXSz: 10,
            rectYSz: 50,
            score: 0,
            gameOn: false
        }

        this.gameLoop = () => {
            let gameOn = this.state.gameOn;
            if(gameOn){
            let rectX = this.state.rectX;
            let rectY = this.state.rectY;
            let rectYSz = this.state.rectYSz;
            let rectXSz = this.state.rectXSz;
            let ballX = this.state.ballX += this.state.ballXV;
            let ballY = this.state.ballY += this.state.ballYV;
            let ballSz = this.state.ballSz;
            let ballXV = this.state.ballXV;
            let ballYV = this.state.ballYV;
            let score = this.state.score;

            //Check if ball collided with the paddle
            let distX = Math.abs((rectX + rectXSz/2) - ballX);
            let distY = Math.abs((rectY + rectYSz/2) - ballY);
            if(distX <= rectXSz/2 + ballSz && distY <= rectYSz/2 + ballSz) {
                if(ballXV < 0)
                    ballXV = ballXV * -1;
                score++;                 
            }
                           
            //Check if ball hit the top or bottom of the screen 
            if (ballY < 0 + ballSz || ballY + ballSz > 400) {
                ballYV = ballYV * -1;                   
            }

            //Check if ball hits the right side of the screen
            if (ballX + ballSz > 400) {
                ballXV = ballXV * -1;
            } 

            //Check if ball gets past the player
            if (ballX + ballSz < 0) {
                this.gameOver();
            }                                

            if(gameOn){
                this.setState({
                    ballX: ballX,
                    ballY: ballY,
                    ballXV: ballXV,
                    ballYV: ballYV,
                    score: score
                });
            }
            }
        };



        this.changeVelocity = (evt) => {
            evt.preventDefault();
            let rectY = this.state.rectY;
            let gameOn = this.state.gameOn;
            // adding check before the game starts
            if (!gameOn) {
                this.startGame();
            }
            switch (evt.keyCode) {
                case 38:
                case 87:
                    rectY += -5;
                    break;
                case 40:
                case 83:
                    rectY += 5;
                    break;
                default:
                    break;
            }

            this.setState({
                rectY: rectY,
            });
        }

        this.mouseMove = (ele, evt) => {
            let rectY = this.state.rectY;
            let element = ele.getBoundingClientRect();
            rectY = evt.clientY - element.top - this.state.rectYSz / 2;

            if (rectY < 0)
                rectY = 0;

            if (rectY > 400 - this.state.rectYSz)
                rectY = 400 - this.state.rectYSz;

            this.setState({
                rectY: rectY
            });
        }

        this.startGame = () => {
            this.setState({
                ballX: 300,
                ballY: 300,
                rectX: 50,
                rectY: 200,
                ballXV: 10,
                ballYV: 5,
                score: 0,
                gameOn: true
            });
        }

        this.gameOver = () => {
            this.setState({
                gameOn: false
            });
        }
    }
    

    componentDidMount() {
        let timer = setInterval(this.gameLoop, 1000 / 15);
        window.addEventListener('keydown', this.changeVelocity.bind(this));
        this.setState({timer: timer});
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.changeVelocity.bind(this));
        clearInterval(this.state.timer);
    }

   
    render() {
        return ( <
            div id = 'pong' >
            <span style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}}>PONG</span> 
            <Display 
                ballX = {this.state.ballX}
                ballY = {this.state.ballY}
                ballSz = {this.state.ballSz}    
                rectX = {this.state.rectX}
                rectY = {this.state.rectY}
                rectXSz = {this.state.rectXSz}
                rectYSz = {this.state.rectYSz}
                score = {this.state.score}
                mouseMove = {this.mouseMove}
                gameOn = {this.state.gameOn}
            /> 
            </div>
        )
    }
}

export default Pong;