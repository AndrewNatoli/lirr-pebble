/**
 * Welcome to Pebble.js!
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

/*
 Main Window
 */
var main = new UI.Menu({
    sections: [{
      title: "Super Great App!",
      items: [
        {
          title: 'Trains'
        }
      ]
    }]
  });

main.show();

main.on('select', function(e) {
  switch(e.itemIndex) {
    // There used to be other options here ;)
    case 0: // Agenda
        var trainMenu = require("trainmenu");
        trainMenu.open();
      break;
  }
  
});