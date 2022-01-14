$(document).ready(function() {
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// INITIALIZATION ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    var FPS = 60;
    /* refactored
    var playerID = "#player1";
    var playerX = 100;
    var playerY = 100;
    var playerVelocityX = 0;
    var playerVelocityY = 0;
  
    // object containing information about player1
    let player1 = {
    playerID: "#player1",
    playerX: 100,
    playerY: 100,
    playerVelocityX: 0,
    playerVelocityY: 0
    }
  
    // object containing information about player2
    let player2 = {
      playerID: "#player2",
      playerX: 0,
      playerY: 0,
      playerVelocityX: 0,
      playerVelocityY:0
    }
    */
  
    let player1 = FactoryFunction("#player1"); // object containing info about player1
    let player2 = FactoryFunction("#player2"); // object containing info about player2
    let board = FactoryFunction("#board"); // object containing info about the board
    
    // key codes
    const KEY_CODE = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      W: 87,
      A: 65,
      S: 83,
      D: 68,
      C: 67
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// CORE LOGIC //////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    setInterval(newFrame, 1000 / FPS); // execute newFrame() 60 times per second

	$(document).on('keydown', setPlayerVelocity); // execute setPlayerVelocity() in response to keydown events
	$(document).on('keyup', stopPlayerVelocity);  // execute stopPlayerVelocity() in response to keydown events
    $(document).on('keydown', handleKeyDown);  // execute handleKeyDown() in response to keydown
    $(document).on('keyup', handleKeyUp);  // execute handleKeyUp() in response to keyup
    $(document).on('keydown',colorSwap); // execute colorSwap() in response to keydown
  
    function newFrame() {
      
      /* refactored
      // player1playerX += playerVelocityX;
        // playerY += playerVelocityY;
      
        player1.playerX += player1.playerVelocityX;
        player1.playerY += player1.playerVelocityY;
      
        player2.playerX += player2.playerVelocityX;
        player2.playerY += player2.playerVelocityY;

        $(playerID).css("left", playerX);
        $(playerID).css("top", playerY);
      
        $(player1.playerID).css("left", player1.playerX);
        $(player1.playerID).css("top", player1.playerY);
      
        $(player2.playerID).css("left", player2.playerX);
        $(player2.playerID).css("top",player2.playerY)
  
       */

      updateSpeed(); // calls updateSpeed()
      updatePosition(); // calls updatePosition()
      doCollide(player1, player2); // calls doCollide();
      
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
 
  // detects keys being held down for player2
  function handleKeyDown(event){
      
     if (event.which === KEY_CODE.W){ // moves player up
       player2.playerVelocityY = -5;
       
     } else if (event.which === KEY_CODE.A){ // moves player left
       player2.playerVelocityX = -5;
       
     } else if (event.which === KEY_CODE.S){ // moves player down
       player2.playerVelocityY = 5;
       
     } else if (event.which === KEY_CODE.D){ // moves player right
      player2.playerVelocityX = 5; 
     }

    }
  
    // detects keys being lifted for player2
    function handleKeyUp(event){
     
     if (event.which === KEY_CODE.W || event.which === KEY_CODE.S){ // stops vertical movement when keys lifted
       player2.playerVelocityY = 0
     } 
     if (event.which === KEY_CODE.D || event.which === KEY_CODE.A){ // stops horizontal movement when keys lifted
       player2.playerVelocityX = 0;
     }
      
    }
  
   // factory function for players 1 and 2
   function FactoryFunction(id){
     let playerInstance = {};
     playerInstance.playerID = id;
     playerInstance.playerX = parseFloat($(playerInstance.playerID).css("left"));
     playerInstance.playerY = parseFloat($(playerInstance.playerID).css("top"));
     playerInstance.playerVelocityX = 0;
     playerInstance.playerVelocityY = 0
     playerInstance.width = $(playerInstance.playerID).width();
     playerInstance.height = $(playerInstance.playerID).height();
     return playerInstance;
   }
  
  // function to update the players' positions
  function updatePosition(){
        
        //calls detectBorders
        detectBorders(player1);
        detectBorders(player2);
    
        //updates player1's position
        $(player1.playerID).css("left", player1.playerX);
        $(player1.playerID).css("top", player1.playerY);
      
        //updates player2's position
        $(player2.playerID).css("left", player2.playerX);
        $(player2.playerID).css("top",player2.playerY); 
  }
  
  // function to update the players' speed
  function updateSpeed(){
        //updates player1's speed
        player1.playerX += player1.playerVelocityX;
        player1.playerY += player1.playerVelocityY;
        
        //updates player2's speed
        player2.playerX += player2.playerVelocityX;
        player2.playerY += player2.playerVelocityY;
  }
  
  // function to detect game borders 
  function detectBorders(player){ // prevents player from leaving the board
    if (player.playerX <= 0){ // left border
      player.playerX = 0;
    }
    if (player.playerY <= 0){ // upper border
      player.playerY = 0;
    }
    if (player.playerX + player.width >= board.width){ // right border
      player.playerX = board.width - player.width;
    }
    if (player.playerY + player.height >= board.height){ // bottom border
      player.playerY = board.height - player.height;
    }
  }
  
  function doCollide(playerOne, playerTwo){
    // playerOne's sides
    let playerOneLeft = playerOne.playerX;
    let playerOneRight = playerOne.playerX + playerOne.width;
    let playerOneTop = playerOne.playerY;
    let playerOneBottom = playerOne.playerY + playerOne.height;
    
    // playerTwo's sides
    let playerTwoLeft = playerTwo.playerX
    let playerTwoRight = playerTwo.playerX + playerTwo.width;
    let playerTwoTop = playerTwo.playerY;
    let playerTwoBottom = playerTwo.playerY + playerTwo.height;
    
    // collision detection
    if (playerOneRight >= playerTwoLeft && playerOneLeft <= playerTwoRight){
      if (playerOneBottom >= playerTwoTop && playerOneTop <= playerTwoBottom){
        console.log("tag, you're it!"); // prints 'tag, you're it!' when colliding
      }
    }
  }
  
  // swaps player 1 and 2's colors
  function colorSwap(event){
    
    if (event.which === KEY_CODE.C){ // detects if key pressed was 'C'
      // swaps colors of players
      let temp = $(player1.playerID).css("background-color"); 
      let playerTwoColor = $(player2.playerID).css("background-color");
      $(player1.playerID).css("background-color", playerTwoColor);
      $(player2.playerID).css("background-color", temp);
    }
  }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// KEYBOARD FUNCTIONS //////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /** 
    Key codes:
    - left: 37
    - up: 38
    - right: 39
    - down: 40
    - w: 87
    - a: 65
    - s: 83
    - d: 68
    - c: 67
    */
    
  // detects keys pressed for player1
    function setPlayerVelocity(event) {
      /* refactored
        if (event.which === 38) {
           player1.playerVelocityY = -5; 

        }
        if (event.which === 40) {
           player1.playerVelocityY = 5;
        }
        if (event.which === 37) {
           player1.playerVelocityX = -5; 

        }
        if (event.which === 39) {
           player1.playerVelocityX = 5; 
        }
      */
      
        if (event.which === KEY_CODE.UP) { // moves player up
           player1.playerVelocityY = -5; 

        }
        if (event.which === KEY_CODE.DOWN) { // moves player down
           player1.playerVelocityY = 5;
        }
        if (event.which === KEY_CODE.LEFT) { // moves player left
           player1.playerVelocityX = -5; 

        }
        if (event.which === KEY_CODE.RIGHT) { // moves player right
           player1.playerVelocityX = 5; 
        }
    }

    // detects keys lifted for player1
    function stopPlayerVelocity(event) {
      /*  refactored
        if (event.which === 38 || event.which === 40) {
            playerVelocityY = 0; 
          } 
          if (event.which === 37 || event.which === 39) {
           playerVelocityX = 0; 
          }
      */
     
      if (event.which === KEY_CODE.UP || event.which === KEY_CODE.DOWN) { // stops vertical movement when keys lifted

           player1.playerVelocityY = 0;
        }
      if (event.which === KEY_CODE.LEFT || event.which === KEY_CODE.RIGHT){ // stops horizontal movement when keys lifted
           player1.playerVelocityX = 0;
        }
    }

}); // DO NOT DELETE