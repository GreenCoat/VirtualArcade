import ReactDOM from 'react-dom';
import React, {
    PureComponent
} from 'react';
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
            lives: 5,
            gameOn: false
        }



        this.gameLoop = () => {
            let rectX = this.state.rectY;
            let rectY = this.state.rectY;
            let rectYSz = this.state.rectYSz;
            let rectXSz = this.state.rectXSz;
            let ballX = this.state.ballX += this.state.ballXV;
            let ballY = this.state.ballY += this.state.ballYV;
            let ballSz = this.state.ballSz;
            let ballXV = this.state.ballXV;
            let ballYV = this.state.ballYV;
            let lives = this.state.lives;

//
//                            if(rectY < ballY && rectY + rectYSz > ballY) {
//                                ballXV = ballXV * -1;
//                                 console.log("i'm 1");
//            
//                            }
//                            if (rectX <= ballX && rectY >= ballY) {
//                                lives += 1;
//                                ballYV = ballYV * -1;
//                                 console.log("i'm 2");
//                            }
//                            if (ballY < 0 + ballSz || ballY + ballSz > 400) {
//                                ballYV = ballYV * -1;
//                                 console.log("i'm 3");
//                            }
//                            if (ballX + ballSz > 400 || ballX < 0 + ballSz) {
//                                ballXV = ballXV * -1;
//                                 console.log("i'm 4");
//                            }
//     
            
//                            if(rectY < ballY && rectY > ballY) {
//                                ballXV = ballXV * -1;
//                                   console.log("i'm 1");
//                            }
                            if(rectY < ballY && rectY + rectYSz > ballY) {
                               ballYV = ballYV * -1;
                               console.log("i'm 2");
                                
                                
                            }
                            if (ballY < 0 + ballSz || ballY + ballSz > 400) {
                                ballYV = ballYV * -1;
                                console.log("i'm 3");
                                 
                            }
                            if (ballX + ballSz > 400) {
                                console.log("i'm 4");
//                                lives -= 1;
                                ballXV = ballXV * -1;
                                   
                            }

//            this.setShapes = () => {
//                rect(rectX, rectY, 20, 100);
//                ball(ballX, ballY);
////            };
//            this.wallBounce = () => {
//                ballXV = ballXV * -1;
//            };
//
//
//            this.sliderBounce = () => {
//                if (rectY < ballY && rectY + 100 > ballY) {
//                    ballXV = ballXV * -1;
//                    lives += 1;
//                    console.log("sliderBouce");
//                }
//            };
//
//            this.bounceCheck = () => {
//                console.log("bouncecheck is running")
//                if (ballY < 0 || ballY > 400) {
//                    ballYV = ballYV * -1;
//                }
//
//                if (ballX < 400 && ballXV < 0) {
//                    this.sliderBounce();
//                }
//
//                if (ballX > 400 && ballXV > 0) {
//                    this.wallBounce();
//                }
//
//                if (ballX < 0) {
//                    ballX = 750;
//                    lives -= 1;
//                }
//            };
//
//            this.increment = () => {
//                ballX += ballXV;
//                ballY += ballYV;
//
//                if (millis() % 1000 == 0) {
//                    ballXV = ballXV * 2;
//                }
//            };
//            this.scoreCheck = () => {
//
//                let lives = this.state.lives;
//                if (lives <= 0) {
//                    console.log("I'm here");
//                    this.lives = lives + "YOU LOSE";
//                    this.reinitialize();
//                }
//                if (lives >= 10) {
//                    lives = "YOU WIN";
//                    this.reinitialize();
//                }
//            };

            this.setState({
                ballX: ballX,
                ballY: ballY,
                ballXV: ballXV,
                ballYV: ballYV,
                lives: lives
            });


        };



        this.changeVelocity = (evt) => {
            evt.preventDefault();
            let rectY = this.state.rectY;
            let gameOn = this.state.gameOn;
            // adding check before the game starts
            if (!this.state.gameOn) {
                gameOn = true;
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
                rectY: rectY
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

        this.reinitialize = () => {

            this.setState({
                ballX: 300,
                ballY: 300,
                rectX: 50,
                rectY: 200,
                ballXV: 100,
                lives: 0

            });
        }


    }
    


    componentDidMount() {
        this.timer = setInterval(this.gameLoop, 1000 / 10);
        window.addEventListener('keydown', this.changeVelocity.bind(this));

    }

   
    render() {
        return ( <
            div id = 'pong' >
            PONG <
            Display ballX = {
                this.state.ballX
            }
            ballY = {
                this.state.ballY
            }
            ballSz = {
                this.state.ballSz
            }
            ballxv = {
                this.state.ballXV
            }
            ballyv = {
                this.state.ballYV
            }
            rectX = {
                this.state.rectX
            }
            rectY = {
                this.state.rectY
            }
            rectXSz = {
                this.state.rectXSz
            }
            rectYSz = {
                this.state.rectYSz
            }
            lives = {
                this.state.lives
            }
            mouseMove = {
                this.mouseMove
            }

            /> <
            /div>
        )
    }
}

export default Pong;