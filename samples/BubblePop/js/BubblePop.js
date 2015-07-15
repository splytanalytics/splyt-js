/**
 * Bubble Pop
 * A simple "shell" game written in with the help of KineticJS (http://kineticjs.com/) and 
 * http://www.html5canvastutorials.com/kineticjs/html5-canvas-events-tutorials-introduction-with-kineticjs/
 *
 * This game is not intended to show case HTML5 skills (or lack thereof :P) or APIs but rather 
 * how one might integrate Splyt into a game written in javascript.
 * 
 * This file assume that Kinetic JS, jQuery, and Splyt have been sourced before it.  All points
 * of integration of Splyt are marked with big comment blocks that look like this:
 * /***Splyt!*************************/
/* ...
 * /**********************************/
/*
 * Enjoy!
 */
var BubblePop = {
    /**
     * BubblePop.init
     * Initialize the game and draws the HUD.
     */
    init: function(container, width, height) {
        //save our initialization vars...
        BubblePop.mContainer = container;
        BubblePop.mWidth = width;
        BubblePop.mHeight = height;

        //give some gold...
        BubblePop.mGoldBalance = BubblePop.getInitialGold();

        //create the main KineticJS stage...
        BubblePop.mStage = new Kinetic.Stage({
            container:container,
            width:width,
            height:height
        });

        //create a layer to put everything on...
        BubblePop.mLayer = new Kinetic.Layer();

        BubblePop.mLayer.add(new Kinetic.Rect({
            x:0, y:0, width:width, height:height, fill:'ffffff'
        }));

        //draw the HUD...
        BubblePop.drawHUD();

        //add the layer to the stage...
        BubblePop.mStage.add(BubblePop.mLayer);

        //put us in the ready state...
        BubblePop.goToReadyState();
    },

    /**
     * BubblePop.drawHUD
     * Draw the HUD for the bubble pop game.
     */
    drawHUD: function() {
        //build the HUD...
        var x = BubblePop.mWidth-BubblePop.HUD_AREA.width + 30;
        var y = 5;
        var pad = 5;
        //var initialGold = BubblePop.getInitialGold();

        var hudPlusAreaDef = $.extend({x:x+pad, y:y+pad}, BubblePop.HUD_ADD_AREA);
        var hudPlusTextDef = $.extend({x:x+pad, y:y+pad}, BubblePop.HUD_ADD_PLUS);
        var hudTextDef = $.extend({x:x+pad+hudPlusAreaDef.width+pad, y: y+pad, text:BubblePop.makeHUDText()}, BubblePop.HUD_TEXT);
        var incAmount = 25;

        var hudImage = new Image();
        hudImage.src = 'img/badge.png';

        hudImage.onload = function() {
            var hudBG = new Kinetic.Image({x:490,y:-100,image:hudImage,width:180,height:180});

            // add the image to the layer
            BubblePop.mLayer.add(hudBG);

            BubblePop.mLayer.add(new Kinetic.Rect(hudPlusAreaDef).on('touchend mouseup', function(){BubblePop.purchaseGold(incAmount);}));
            BubblePop.mLayer.add(new Kinetic.Text(hudPlusTextDef).on('touchend mouseup', function(){BubblePop.purchaseGold(incAmount);}));
            BubblePop.mLayer.add(new Kinetic.Text(hudTextDef));

            BubblePop.mLayer.draw();
        };
    },


    /**
     * BubblePop.goToReadyState
     * Set up the stage for the ready state of the game.  This includes drawing
     * the START button.
     */
    goToReadyState: function() {
        var startScreenWidth = 498;
        var startScreenHeight = 178;
        var x = (BubblePop.mWidth * .5) - (startScreenWidth * .5);
        var y = (BubblePop.mHeight * .5) - (startScreenHeight * .5);
        var cost = BubblePop.getGameCost();
        var buttonTextDef = $.extend({x:x, y:y+130, text:"$"+cost+" Gold"}, BubblePop.START_BUTTON_TEXT);

        var cleanUpStateAndTransition = function() {
            if(BubblePop.mGoldBalance >= cost)
            {
                //clean up and shapes in the ready state...
                var stateShapes = BubblePop.mStage.get('.ready');
                stateShapes.each(function(node){
                    node.remove();
                });

                //okay purchase the game...
                BubblePop.purchaseNewGame(cost);

                //start a new game...
                BubblePop.startNewGame();
            }
        };

        var imageObj = new Image();
        imageObj.src = 'img/start_game.png';

        imageObj.onload = function() {
            var startGameScreen = new Kinetic.Image({x:x,y:y,image:imageObj,width:startScreenWidth,height:startScreenHeight,name:'ready'}).on('mouseup touchend', cleanUpStateAndTransition);

            // add the shape to the layer
            BubblePop.mLayer.add(startGameScreen);

            BubblePop.mLayer.add(new Kinetic.Text(buttonTextDef).on('mouseup touchend', cleanUpStateAndTransition));

            BubblePop.mLayer.draw();
        };
    },

    /**
     * BubblePop.startNewGame
     * Set up the stage for a new game.  Draw all the bubble that need popping.
     */
    startNewGame: function() {

        /***Splyt!*************************/
        Splyt.Instrumentation.beginTransaction("game", 10*60, {}, "startNewGame");
        /**********************************/

        var cleanUpStateAndTransition = function(index) {
            var stateShapes = BubblePop.mStage.get('.gameplay');
            stateShapes.each(function(node){
                node.remove();
            });
            BubblePop.goToWinState(index);
        };

        // Track how many pops were required to win.
        BubblePop.mNumPops = 0;

        //create new (or, quash old) bubbles!...
        BubblePop.mBubbleDefs = Array(BubblePop.NUM_BUBBLES);
        for(var i=0; i< BubblePop.NUM_BUBBLES; ++i)
        {
            var width = BubblePop.mWidth;
            var height = BubblePop.mHeight;

            var x = (width/(BubblePop.NUM_BUBBLES+1))*(i+1);
            var y = height/2;

            /***Splyt!*************************/
            //The color of the bubbles is a variable in Splyt.  Try to get
            //it from there, falling back to 'cyan' as a default.
            var bubbleColor = Splyt.Tuning.getVar('bubbleColor', 'a2c5f0');
            /**********************************/

            BubblePop.mBubbleDefs[i] = $.extend({
                x:x,
                y:y,
                id:"b"+i,
                fill:bubbleColor
            }, BubblePop.BUBBLE_PROTO);

            //"put" the star "in" one of the bubbles...
            BubblePop.mStarBubble = BubblePop.rand(BubblePop.NUM_BUBBLES);

            //bubbles will just be circles...hooray programmer art!...also go
            //ahead and and a click handler to the bubbles to "pop" them...
            BubblePop.mLayer.add(new Kinetic.Circle(BubblePop.mBubbleDefs[i])
                .on('mouseup touchend', function(){

                    BubblePop.mNumPops++;

                    var index = this.getId().charAt(1);
                    if(index == BubblePop.mStarBubble)
                    {
                        //you win!
                        cleanUpStateAndTransition(index);
                    }
                    else
                    {
                        this.remove();
                    }
                })
            );
        }

        //now create a single animation for the scene that we use to make the
        //bubbles kind of ~waft~ there...
        BubblePop.mWaftAnim = new Kinetic.Animation(function(frame) {
            var stateShapes = BubblePop.mStage.get('.gameplay');
            stateShapes.each(function(node) {
                if(node.getId().charAt(0) == 'b')
                {
                    var origY = BubblePop.mBubbleDefs[node.getId().charAt(1)].y;
                    var updateY = 5*Math.sin(frame.time*2*Math.PI/2500)+origY;
                    node.setY(updateY);
                }
            });
        }, BubblePop.mLayer);
        BubblePop.mWaftAnim.start();

        //update the layer...
        BubblePop.mLayer.draw();
    },

    getGameScore: function() {
        //score is on a 0 to 1 scale, based on the number of pops.
        //
        //starts at 1, and decreases with each pop.  If all bubbles are
        //popped before player wins, final score is 0.
        return (BubblePop.NUM_BUBBLES - BubblePop.mNumPops) / parseFloat(BubblePop.NUM_BUBBLES - 1);
    },

    /**
     * BubblePop.goToWinState
     * Sets up the stage for the YOU WON! state.  Draws and animates the star.
     */
    goToWinState: function(index) {

        /***Splyt!*************************/
        Splyt.Instrumentation.endTransaction("game", Splyt.TXN_SUCCESS, {
            numberOfPops: BubblePop.mNumPops,               //how many pops were required to win?
            winQuality: BubblePop.getGameScore().toFixed(3) //0 to 1 assessment of win quality; 1 is perfect (single pop)
        }, "goToWinState");
        /**********************************/

        //create the star in the position of the bubble that was popped to win...
        var starDef = $.extend({
            x:BubblePop.mBubbleDefs[index].x,
            y:BubblePop.mBubbleDefs[index].y},
            BubblePop.STAR_PROTO
        );
        var starShape =  new Kinetic.Star(starDef);
        BubblePop.mLayer.add(starShape);

        //wait a half second, then transition the star to scale up, then
        //scale down, then transition the game.
        setTimeout(function() {
            starShape.transitionTo({
                //scale up slowly...
                scale:{x:1.6,y:1.6},
                x:BubblePop.mWidth/2,
                y:BubblePop.mHeight/2,
                duration: 0.75,
                callback: function() {
                    setTimeout(function(){
                        starShape.transitionTo({
                            //then down more quickly...
                            scale:{x:0, y:0},
                            duration: 0.2,
                            callback: function() {
                                //and restart the game...
                                starShape.remove();
                                BubblePop.goToReadyState();
                            }
                        });
                    }, 500);
                }
            });
        }, 500);

        //update the layer...
        BubblePop.mLayer.draw();
    },

    /**
     * BubblePop.purchaseGold
     * Function to simulate purchasing gold.  In a real game this function would likely be at end
     * of some real money purchasing flow.  For the purposes of Splyt, we will simulate a 0.99c
     * purchasing in USD.
     */
    purchaseGold: function(amount) {
        //update balance and animate the HUD...
        BubblePop.mGoldBalance += amount;
        BubblePop.updateHUD(false);

        /***Splyt!*************************/
        //Record that this purchase happened with the Splyt purchasing plugin.
        Splyt.Purchasing.purchase('gold-25', 'standard-gold', 'hud-plus', 'usd', 0.99, Splyt.TXN_SUCCESS, "purchaseGold");
        /**********************************/
    },

    /**
     * BubblePop.purchaseNewGame
     * Take care of everything that is needed to buy a new game.
     */
    purchaseNewGame: function(amount) {
        //update balance and animate the HUD...
        BubblePop.mGoldBalance -= amount;
        BubblePop.updateHUD(true);

        /***Splyt!*************************/
        //Record that this purchase happened with the Splyt purchasing plugin.
        Splyt.Purchasing.purchase('new-game', 'standard-game', 'start-button', 'gold', amount, Splyt.TXN_SUCCESS, "purchaseNewGame");
        /**********************************/
    },

    /**
     * BubblePop.getInitialGold
     * Returns the initial amount of gold that a user should get.
     */
    getInitialGold: function() {
        /***Splyt!*************************/
        //The initial seeded gold is a variable in Splyt.  Try to get it from there
        //first.  If that doesn't work, use a provided default value.
        return Splyt.Tuning.getVar('initialGoldAmount', 100);
        /**********************************/
    },

    /**
     * BubblePop.getGameCost
     * Returns the cost of each game of Bubble Pop in gold.
     */
    getGameCost: function() {
        /***Splyt!*************************/
        //The game cost is a variable in Splyt.  Try to get it from there
        //first.  If that doesn't work, use a provided default value.
        return Splyt.Tuning.getVar('newGamePrice', 100);
        /**********************************/
    },

    /**
     * BubblePop.makeHUDText
     * Uses state information to create the text that should be rendered on the HUD
     */
    makeHUDText: function() {
        return "Gold: "+BubblePop.mGoldBalance;
    },

    /**
     * BubblePop.updateHUD
     * Update the HUD.  Can animate or not.
     */
    updateHUD: function(animate) {
        var text = BubblePop.mStage.get('#hud-text')[0];

        if(animate)
        {
            text.transitionTo({
                scale:{x:1.1,y:1.1},
                duration: 0.2,
                callback: function() {
                    setTimeout(function(){
                        text.setText(BubblePop.makeHUDText());
                        BubblePop.mLayer.draw();
                        setTimeout(function(){
                            text.transitionTo({
                                scale:{x:1.0, y:1.0},
                                duration: 0.2,
                            });
                        }, 500);
                    }, 500);
                }
            });
        }
        else
        {
            text.setText(BubblePop.makeHUDText());
            BubblePop.mLayer.draw();
        }
    },

    /**
     * BubblePop.rand
     * Simple random number wrapper for use by Bubble Pop.
     * This function lifted from Jeff Friesen's Sea Battle HTML5 demo which can be found:
     * http://www.sitepoint.com/gaming-battle-on-the-high-seas-part-1/
     */
    rand: function(limit)
    {
        return (Math.random()*limit)|0;
    },

    NUM_BUBBLES: 4,
    BUBBLE_PROTO: {
        radius:20,
        stroke:'grey',
        strokeWidth:0.5,
        name:'gameplay'
    },
    START_BUTTON: {
        width:498,
        height:178,
        fill:'none',
        stroke:'grey',
        strokeWidth:0.5,
        name:'ready',
        id:'start-button'
    },
    START_BUTTON_TEXT: {
        fontSize:30,
        fontFamily:'Ostrich Sans Black',
        fill:'bd6565',
        width:498,
        height:178,
        align:'center',
        name:'ready',
        id:'start-text'
    },
    STAR_PROTO: {
        numPoints: 5,
        innerRadius: 20,
        outerRadius: 30,
        fill: 'ffec6e',
        stroke: 'grey',
        strokeWidth:0.5,
        name:'gameover',
        id:'star'
    },
    HUD_AREA: {
        width: 150,
        height: 75,
        fill: 'black',
        stroke: 'cyan',
        strokeWidth: 2,
        name: 'hud',
        id: 'hud-area'
    },
    HUD_TEXT: {
        fontSize:25,
        fontFamily:'Ostrich Sans Black',
        fill:'ebebeb',
        width:100,
        height:50,
        name:'hud',
        id:'hud-text'
    },
    HUD_ADD_AREA: {
        width: 20,
        height: 20,
        fill: 'ebebeb',
        name: 'hud',
        id: 'hud-add-area',
    },
    HUD_ADD_PLUS: {
        text:"+",
        fontSize:25,
        fontFamily:'Ostrich Sans Black',
        align:"center",
        fill:'3a69a4',
        width:20,
        height:20,
        name:'hud',
        id:'hud-add-plus'
    },
};