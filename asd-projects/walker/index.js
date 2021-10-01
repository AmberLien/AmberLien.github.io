/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
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
    if (event.which === KEY.LEFT) {
      speedX -= 5;
    } else if (event.which === KEY.UP){
      speedY -= 5;
    } else if(event.which === KEY.RIGHT){
      speedX += 5;
    } else if (event.which === KEY.DOWN){
      speedY += 5;
    }
    //logic for Game Item Two
    if (event.which === KEY.A) { //left
      speedXTwo -= 5;
    } else if (event.which === KEY.W){ //up
      speedYTwo -= 5;
    } else if(event.which === KEY.D){ //right
      speedXTwo += 5;
    } else if (event.which === KEY.S){ //down
      speedYTwo += 5;
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
    positionX += speedX;
    positionY += speedY;
    positionXTwo += speedXTwo;
    positionYTwo += speedYTwo;
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
