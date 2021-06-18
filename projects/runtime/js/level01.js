var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
       createSawBlade(400,215);
       createSawBlade(1000,groundY);
       createSawBlade(1500,310);
        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);    
        
            var obstacleImage = draw.bitmap('img/sawblade.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25
            sawBladeHitZone.addChild(obstacleImage);
        }        
        createKnife(700,groundY - 20);
        createKnife(1100,210);
        createKnife(1300,310);
        function createKnife(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 5;
            var knifeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            knifeHitZone.x = x;
            knifeHitZone.y = y;
            game.addGameItem(knifeHitZone);

            var knifeImage = draw.bitmap('img/knife.png');
            knifeImage.scaleX = .09;
            knifeImage.scaleY = .30;
            knifeImage.x = -30;
            knifeImage.y = -90;
            knifeHitZone.addChild(knifeImage);
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
