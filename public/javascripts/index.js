const { Socket } = require("socket.io");

/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    console.log("Hello World!")
    $('.btnPost').click(onPostClicked);
}



/**
 * Logic what to do once submit is clicked
 */
function onPostClicked(){
    let x = 1
    console.log(`${x} World`)
}



/**
 * All the page requirements that need to be loaded from the start
 */
function init(){
    initHandlers();
}



/**
 * Setup everything on page loaded
 */
$(document).ready(function(){
     init();
});