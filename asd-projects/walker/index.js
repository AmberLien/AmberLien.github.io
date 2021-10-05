/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var boardWidth = 440;
  var boardHeight = 440;
  var gameItemSize = 50;
  var KEY = {
   'LEFT': 37,
   'UP': 38,
   'RIGHT': 39,
   'DOWN': 40,
   'W': 87,
   'A': 65,
   'S': 83,
   'D': 68
  }

  // Game Item Objects
  var positionX = 0;      //the x position for gameItem
  var positionY = 0;      //the y position for gameItem
  var speedX = 0;         //the x speed for gameItem
  var speedY = 0;         //the y speed for gameItem

  // Game Item Two Objects
  var positionXTwo = 0;   //the x position for gameItemTwo
  var positionYTwo = 0;   //the y position for gameItemTwo
  var speedXTwo = 0;      //the x speed for gameItemTwo
  var speedYTwo = 0;      //the y speed for gameItemTwo

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
  //logic for Game Item
  //determines speed when the left arrow is pressed
    if (event.which === KEY.LEFT) {                 
      if (positionX <= 0){ //prevents gameItem from leaving the leftmost border
        speedX = 0;
      } else{
        speedX -= 5;
      }  
  //determiens speed when the up arrow is pressed
    } else if (event.which === KEY.UP){             
      if (positionY <= 0){ //prevents gameItem from leaving the upper border
        speedY = 0;
      } else{
        speedY -= 5;
      }
  //determines speed when the right arrow is pressed
    } else if(event.which === KEY.RIGHT){           
      if (positionX >= boardWidth - gameItemSize){  //prevents gameItem from leaving the rightmost border
        speedX = 0;
      } else{
        speedX += 5;
      }
    //determines speed when the down arrow is pressed
    } else if (event.which === KEY.DOWN){           
      if (positionY >= boardWidth - gameItemSize){  //prevents gameItem from leaving the bottom border
        speedY = 0;
      } else{
        speedY += 5;
      }
    }

    //logic for Game Item Two
    //determines speed for A (left) movement
    if (event.which === KEY.A) {
      if (positionXTwo <= 0) { //prevents gameItemTwo from leaving the leftmost border
        speedXTwo = 0;
      } else{
        speedXTwo -= 5;
      }
    //determines speed for W (up) movement
    } else if (event.which === KEY.W){ //prevents gameItemTwo from leaving the upper border
      if (positionYTwo <= 0) {
        speedYTwo = 0;
      } else{
        speedYTwo -= 5;
      }
    //determines speed for D (right) movement
    } else if(event.which === KEY.D){
      if (positionXTwo >= boardWidth - gameItemSize){ //prevents gameItemTwo from leaving the rightmost border
        speedXTwo = 0;
      } else{
        speedXTwo += 5;
      }
    //determines speed for S (down) movement
    } else if (event.which === KEY.S){
      if (positionYTwo >= boardHeight - gameItemSize){ //prevents gameItemTwo from leaving the lower border
        speedYTwo = 0;
      } else{
        speedYTwo += 5;
      }
    }
  }

  function handleKeyUp(event){
    //logic for Game Item
    if (event.which === KEY.LEFT) {
      speedX = 0;
    } else if (event.which === KEY.UP){
      speedY = 0;
    } else if(event.which === KEY.RIGHT){
      speedX = 0;
    } else if (event.which === KEY.DOWN){
      speedY = 0;
    }
    //logic for Game Item Two
    if (event.which === KEY.A) {
      speedXTwo = 0;
    } else if (event.which === KEY.W){
      speedYTwo = 0;
    } else if(event.which === KEY.D){
      speedXTwo = 0;
    } else if (event.which === KEY.S){
      speedYTwo = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
  //positioning for gameItem
  //horizontal positioning
    if (positionX < 0){ //repositions gameItem if it moves past left border
      positionX = 0;
    } else if (positionX > boardWidth - gameItemSize){ //reposiitons gameItem if it moves past right border
      positionX = boardWidth - gameItemSize;
    } else {
      positionX += speedX;          
    }
  //vertical positioning
    if (positionY < 0){ //repositions gameItem if it moves above the upper border
      positionY = 0;
    } else if (positionY > boardHeight - gameItemSize){ //repositions gameItem if it moves below the bottom border
      positionY = boardHeight - gameItemSize;
    } else {
      positionY += speedY;
    }
  //positioning for gameItemTwo
  //horizontal positioning
  if (positionXTwo < 0){ //repositions gameItemTwo if it moves past left border
    positionXTwo = 0;
  } else if (positionXTwo > boardWidth - gameItemSize){ //repositions gameItemTwo if it moves past right border
    positionXTwo = boardWidth - gameItemSize;
  } else{
    positionXTwo += speedXTwo;
  }
  //vertical positioning
  if (positionYTwo < 0){ //repositions gameItemTwo if it moves past upper border
    positionYTwo = 0;
  } else if (positionYTwo > boardHeight - gameItemSize){ //repositions gameItemTwo if it moves past bottom border
    positionYTwo = boardHeight - gameItemSize;
  } else {
    positionYTwo += speedYTwo;
  }
  }

  function redrawGameItem(){
    $("#gameItem").css({
      "left": positionX,
      "top": positionY
  });
    $("#gameItemTwo").css({
      "left": positionXTwo,
      "top": positionYTwo
    })
}
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
