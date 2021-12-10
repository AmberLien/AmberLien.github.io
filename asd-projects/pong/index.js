/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY_OBJECT = {  //key codes
    //paddleOne
    "w": 87,
    "s": 83,
    
    //paddleTwo
    "up": 38,
    "down": 40
  }

  // GAME VARIABLES //
  //ping pong ball
  let positionBallX = Math.floor(Math.random() * 200 + 100); //sets the ball's x position randomly in the middle of the board
  let positionBallY = Math.floor(Math.random() * 200 + 100); //sets the ball's y position randomly in the middle of the board
  let speedBallX;
  let speedBallY;

  // Game Item Objects
  let paddleOne = FactoryFunction("#paddleOne"); //creates the object containing info abt paddleOne
  let paddleTwo = FactoryFunction("#paddleTwo"); //creates the object containing info abt paddleTwo
  let ball = FactoryFunction("#ball");           //creates the object containing info abt the ball

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  startBall();
  $(document).on('keydown', handleKeyDown); //logs when a key is pressed
  $(document).on('keyup', handleKeyUp); //logs when a key is released

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //paddles' movement
    paddleOne.y = paddleOne.y + paddleOne.speedY; //updates paddleOne's position
    paddleTwo.y = paddleTwo.y + paddleTwo.speedY; //updates paddleTwo's position
    $(paddleOne.id).css("top", paddleOne.y);  //updates the position in the paddleOne object
    $(paddleTwo.id).css("top", paddleTwo.y); //updates the position in the paddleTwo object

    //ball's movement
    ball.x = $(ball.id).css("left", positionBallX); //updates the ball's x position
    ball.y = $(ball.id).css("top", positionBallY); //updates the ball's y position
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //keyboard events
    if (event.which === KEY_OBJECT.w){
      paddleOne.speedY = -5; //moves paddleOne up
    } else if (event.which === KEY_OBJECT.s){
      paddleOne.speedY = 5; //moves paddleOne down
    } 
    if (event.which === KEY_OBJECT.up){
      paddleTwo.speedY = -5; //moves paddleTwo up
    } else if (event.which === KEY_OBJECT.down){
      paddleTwo.speedY = 5; //moves paddleTwo down
    }
  }

  function handleKeyUp(event){
    if(event.which === KEY_OBJECT.w){
      paddleOne.speedY = 0; //stops paddleOne from moving up
    } else if (event.which === KEY_OBJECT.s){
      paddleOne.speedY = 0; //stops paddleOne from moving down
    }
    if (event.which === KEY_OBJECT.up){
      paddleTwo.speedY = 0; //stops paddleTwo from moving up
    } else if(event.which === KEY_OBJECT.down){
      paddleTwo.speedY = 0; //stops paddleTwo from moving down
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function FactoryFunction(id){
    const gameInstance = {};              //creates an instance
    gameInstance.id = id;                 //creates the id property
    gameInstance.x = parseFloat($(id).css("left"));   //creates the x property
    gameInstance.y = parseFloat($(id).css("top"));    //creates the y property
    gameInstance.width = $(id).width();   //creates the width property
    gameInstance.height = $(id).height(); //creates the height property
    gameInstance.speedX = 0;              //creates the speedX property
    gameInstance.speedY = 0;              //creates the speedY property
    gameInstance.color - $(id).css("background-color");
    return gameInstance;                  //returns an instance
  }

  function startBall(){ //currently being worked on
    let coinFlip = Math.floor(Math.random() * 10); //randomly generates a number to determine the ball's random speed
    speedBallX = coinFlip > 5 ? 1 : -1; //determines which direction the ball is moving in the x-direction
    speedBallY = coinFlip > 5 ? 1 : -1; //determines which direction the ball is moving in the y-direction  
  }
  

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
