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

  // Game Item Variables
  

  //ping pong ball
  let positionBallX; //Math.floor(Math.random() * 50) currently an arbitrary number for testing
  let postiionBallY;
  let speedXBall;
  let speedYBall;

  // Game Item Objects
  let paddleOne = FactoryFunction("#paddleOne"); //creates the object containing info abt paddleOne
  let paddleTwo = FactoryFunction("#paddleTwo"); //creates the object containing info abt paddleTwo
  let ball = FactoryFunction("#ball");           //creates the object containing info abt the ball

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    paddleOne.y = paddleOne.y + paddleOne.speedY;
    paddleTwo.y = paddleTwo.y + paddleTwo.speedY;
    $(paddleOne.id).css("top", paddleOne.y);
    $(paddleTwo.id).css("top", paddleTwo.y);
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
      paddleOne.speedY = 0;
    } else if (event.which === KEY_OBJECT.s){
      paddleOne.speedY = 0;
    }
    if (event.which === KEY_OBJECT.up){
      paddleTwo.speedY = 0;
    } else if(event.which === KEY_OBJECT.down){
      paddleTwo.speedY = 0;
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
  

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
