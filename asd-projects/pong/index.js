/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  let paddleOne = FactoryFunction("#paddleOne"); //creates the object containing info abt paddleOne
  let paddleTwo = FactoryFunction("#paddleTwo"); //creates the object containing info abt paddleTwo
  let ball = FactoryFunction("#ball");           //creates the object containing info abt the ball

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function FactoryFunction(id){
    const gameInstance = {};              //creates an instance
    gameInstance.id = id;                 //creates the id property
    gameInstance.x = $(id).css("left");   //creates the x property
    gameInstance.y = $(id).css("top");    //creates the y property
    gameInstance.width = $(id).width();   //creates the width property
    gameInstance.height = $(id).height(); //creates the height property
    gameInstance.speedX = 0;              //creates the speedX property
    gameInstance.speedY = 0;              //creates the speedY property
    return gameInstance;                  //returns an instance
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
