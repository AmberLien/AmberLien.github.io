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
                { "type": "sawblade", "x": 400, "y": 215 },
                { "type": "sawblade", "x": 1000, "y": groundY },
                { "type": "sawblade", "x": 1500, "y": 310 },
                { "type": "knife","x":700,"y": groundY - 20},
                { "type": "knife","x": 1100, "y": 210},
                { "type": "knife","x": 1300, "y": 310},
                { "type": "enemy", "x": 500, "y": groundY-30},
                { "type": "reward", "x": 900, "y": groundY-10}
            ]
        };
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItemObject = levelData.gameItems[i];
            var gameItemObjectType = gameItemObject.type;
            var gameItemObjectX = gameItemObject.x;
            var gameItemObjectY = gameItemObject.y;
            if (gameItemObjectType === "sawblade"){
                createSawBlade(gameItemObjectX,gameItemObjectY);
            } else if (gameItemObjectType === "knife"){
                createKnife(gameItemObjectX,gameItemObjectY);
            } else if (gameItemObjectType === "enemy"){
                createEnemy(gameItemObjectX, gameItemObjectY);
            } else if (gameItemObjectType === "reward"){
                createReward(gameItemObjectX,gameItemObjectY);
            }
        }

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        //obstacles

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

        //ENEMY CODE STARTS HERE
        function createEnemy(x,y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);

            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;

            enemy.onPlayerCollision = function() {
               console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function(){
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.fadeOut();
            }
        }
        //ENEMY CODE ENDS HERE

        function createReward(x,y){
            var reward = game.createGameItem('reward',25);
            var blueSquare = draw.rect(50,50,'blue');
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);

            reward.velocityX = -1;

            reward.onPlayerCollision = function() {
                game.increaseScore(50);
                reward.fadeOut();
            };
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
