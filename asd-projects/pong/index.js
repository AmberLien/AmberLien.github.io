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

  // Game Item Objects
  let paddleOne = FactoryFunction("#paddleOne"); //creates the object containing info abt paddleOne
  let paddleTwo = FactoryFunction("#paddleTwo"); //creates the object containing info abt paddleTwo
  let ball = FactoryFunction("#ball");           //creates the object containing info abt the ball
  let board = FactoryFunction("#board");         //creates the object containing info abt the board
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
    detectBall(); //checks the ball's speed and position
    ball.x = ball.x + ball.speedX; //updates the ball's x position w/ the x speed
    ball.y = ball.y + ball.speedY; //updates the ball's y position w/ the y speed
    $(ball.id).css("left", ball.x); //updates the ball's x position
    $(ball.id).css("top", ball.y);  //updates the ball's y position
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //keyboard events
    if (event.which === KEY_OBJECT.w){
      if (paddleOne.y <= 0){
        paddleOne.speedY = 0; //prevents paddleOne from moving past upper border
        paddleOne.y = 0; //moves paddle to proper position
      } else{
        paddleOne.speedY = -5 //moves paddleOne up
      }
    }
    if (event.which === KEY_OBJECT.s){
      if (paddleOne.y + paddleOne.height >= board.height){
        paddleOne.speedY = 0; //prevents paddle from moving past lower border
        paddleOne.y = board.height - paddleOne.height; //moves paddle to proper position
      } else{
        paddleOne.speedY = 5; //moves paddleOne down
      }
   } 

    if (event.which === KEY_OBJECT.up){
      if (paddleTwo.y <= 0){
        paddleTwo.speedY = 0; //prevents paddle from moving past lower border
        paddleTwo.y = 0; //moves paddle to proper position
      } else{
        paddleTwo.speedY = -5; //moves paddleTwo up
      }
    }
      if (event.which === KEY_OBJECT.down){
        if (paddleTwo.y + paddleTwo.height >= board.height){
          paddleTwo.speedY = 0; //prevents paddle from moving past upper border
          paddleTwo.y = board.height - paddleTwo.height //moves paddle to proper position
        } else{
          paddleTwo.speedY = 5; //moves paddleTwo down
        }
    }
  }

  function handleKeyUp(event){ //!!!!!WORK ON GETTING THIS TO NOT OCCASIONALLY GLITCH
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
    gameInstance.width = parseFloat($(id).width());   //creates the width property
    gameInstance.height = parseFloat($(id).height()); //creates the height property
    gameInstance.speedX = 0;              //creates the speedX property
    gameInstance.speedY = 0;              //creates the speedY property
    gameInstance.color - $(id).css("background-color");
    return gameInstance;                  //returns an instance
  }

  function startBall(){
    ball.x = Math.random() * 200 + 100; //sets the ball's initial x position around the middle
    ball.y = Math.random() * 200 + 100; //sets the ball's initial y position around the middle
    ball.speedX = (Math.random() * 3 + 2) * Math.random() > .5 ? 1 : -1; //assigns the x speed b/w -5 and 5
    ball.speedY = (Math.random() * 3 + 2) * Math.random() > .5 ? 1 : -1; //assigns the y speed b/w -5 and 5  
  }

  function detectBall(){
    if ((ball.x <= 0) || ((ball.x + ball.width) >= board.width)) { //prevents ball from moving past left and right borders
      ball.speedX *= -1; //reverses ball's direction
    }
    if ((ball.y <= 0) || ((ball.y + ball.height) >= board.height)){ //prevents ball from moving past upper and lower borders
      ball.speedY *= -1; //reverses ball's direction
    }
  }
  /* MAYBE
  function detectBorder(movingObject, stationaryObject){
    if (movingObject.y <= 0){
      movingObject.y = 0;
    }
    if (movingObject.y + stationaryObject.height >= stationaryObject.height){
      movingObject.y = stationaryObject.height - movingObject.height;
    }
  }
  */

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
