/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY_OBJECT = {  // key codes
    // paddleOne
    "w": 87,
    "s": 83,
    
    // paddleTwo
    "up": 38,
    "down": 40
  }

  // Game Item Objects
  let paddleOne = FactoryFunction("#paddleOne"); // creates the object containing info abt paddleOne
  let paddleTwo = FactoryFunction("#paddleTwo"); // creates the object containing info abt paddleTwo
  let ball = FactoryFunction("#ball");           // creates the object containing info abt the ball
  let board = FactoryFunction("#board");         // creates the object containing info abt the board
  let scoreOne = FactoryFunction("#scoreOne");   // creates the object containing info abt the score for paddleOne
  let scoreTwo = FactoryFunction("#scoreTwo");   // creates the object containing info abt the score for paddleTwo
  
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  startBall(); // puts the ball in motion
  $(document).on('keydown', handleKeyDown); // logs when a key is pressed
  $(document).on('keyup', handleKeyUp); // logs when a key is released

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    ///// Paddles' Movement ////
    paddleOne.y = paddleOne.y + paddleOne.speedY; // updates paddleOne's position
    paddleTwo.y = paddleTwo.y + paddleTwo.speedY; // updates paddleTwo's position

    // Checks whether the paddles are above/below the box's borders
    detectPaddle(paddleOne, board);
    detectPaddle(paddleTwo, board);

    $(paddleOne.id).css("top", paddleOne.y); // updates the position in the paddleOne object
    $(paddleTwo.id).css("top", paddleTwo.y); // updates the position in the paddleTwo object

    //// Ball's Movement ////
    ball.x = ball.x + ball.speedX; // updates the ball's x position w/ the x speed
    ball.y = ball.y + ball.speedY; // updates the ball's y position w/ the y speed

    detectBall(); // checks the ball's speed and position
    $(ball.id).css("background-color", ball.color);
    $(ball.id).css("left", ball.x); // updates the ball's x position
    $(ball.id).css("top", ball.y);  // updates the ball's y position
  }
  
  // Called in response to events.
  function handleKeyDown(event) { // keyboard events
    // paddleOne
    if (event.which === KEY_OBJECT.w){
      paddleOne.speedY = paddleOne.y <= 0 ? 0 : -5 // sets paddleOne's speed to 0 if above board or -5 if not
    }
    if (event.which === KEY_OBJECT.s){
      paddleOne.speedY = paddleOne.y >= board.height - paddleOne.height ? 0 : 5 // sets paddleOne's speed to 0 if below board or 5 if not
   } 
    // paddleTwo
    if (event.which === KEY_OBJECT.up){
      paddleTwo.speedY = paddleTwo.y <= 0 ? 0 : -5; // sets paddleTwo's speed to 0 if above board or -5 if not
    }
    if (event.which === KEY_OBJECT.down){
      paddleTwo.speedY = paddleTwo.y >= board.height - paddleTwo.height ? 0 : 5; // sets paddleTwo's speed to 0 if below board or 5 if not
    }
  }

  function handleKeyUp(event){
    if (event.which === KEY_OBJECT.w){
      paddleOne.speedY = 0; // stops paddleOne from moving up
    } else if (event.which === KEY_OBJECT.s){
      paddleOne.speedY = 0; // stops paddleOne from moving down
    }
    if (event.which === KEY_OBJECT.up){
      paddleTwo.speedY = 0; // stops paddleTwo from moving up
    } else if(event.which === KEY_OBJECT.down){
      paddleTwo.speedY = 0; // stops paddleTwo from moving down
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function FactoryFunction(id){
    const gameInstance = {};              // creates an instance
    gameInstance.id = id;                 // creates the id property
    gameInstance.x = parseFloat($(id).css("left"));   // creates the x property
    gameInstance.y = parseFloat($(id).css("top"));    // creates the y property
    gameInstance.width = parseFloat($(id).width());   // creates the width property
    gameInstance.height = parseFloat($(id).height()); // creates the height property
    gameInstance.speedX = 0;              // creates the speedX property
    gameInstance.speedY = 0;              // creates the speedY property
    gameInstance.color = $(id).css("background-color");
    return gameInstance;                  // returns an instance
  }

  function startBall(){
    ball.x = Math.random() * 200 + 100; // sets the ball's initial x position around the middle
    ball.y = Math.random() * 200 + 100; // sets the ball's initial y position around the middle
    ball.speedX = (Math.random() * 3 + 4) * Math.random() > .5 ? 1 : -1; // assigns the x speed b/w -5 and 5
    ball.speedY = (Math.random() * 3 + 4) * Math.random() > .5 ? 1 : -1; // assigns the y speed b/w -5 and 5  
  }

  function detectBall(){
    if (ball.x <= 0) { // prevents ball from moving past left and right borders
      score(0); // updates the score
      ball.speedX *= -1; // reverses ball's direction
    } 
    if ((ball.x + ball.width) >= board.width){
      score(); // updates the score
      ball.speedX *= -1;
    }
    // vertical movement
    if ((ball.y <= 0) || ((ball.y + ball.height) >= board.height)){ // prevents ball from moving past upper and lower borders
      ball.speedY *= -1; // reverses ball's direction
    }
  }

  function detectPaddle(movingObject, board){
    if (movingObject.y < 0){ // prevents paddle from moving beyond upper border of the board
      movingObject.y = 0; // sets the paddle's position to the top of the board
    }
    if (movingObject.y + movingObject.height >= board.height){ // prevents paddle from moving beyond lower border of the board
      movingObject.y = board.height - movingObject.height; // sets the paddle's position to the bottom of the board
    }
  }

 ///////// TESTING TESTING TESTING!!!!! ///////////
  function score(position){
    ///scoreOne.text = $(id).css("text", "Hi");
    //tesing collision detection!!
    if (position === 0){
      ball.color = "blue";
    } else{
      ball.color = "pink";
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
