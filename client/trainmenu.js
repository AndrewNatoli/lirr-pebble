/*
 * Menu for selecting a route to look up
 */
var UI = require('ui');

var trainMenu = {                          
  main: null,                   
  open : function() {
      this.main = new UI.Menu({
      sections: [{
        title: "Train Schedule",
        // Follow this format to add additional forward and return line lookups
        items: [
          {
            title: 'RON to NYK'
          }, 
          {
            title: 'NYK to RON'
          }
        ]
      }]
    });
    
    this.main.on('select', function(e) {
      var schedule = require("trainschedule");
      schedule.open(e.itemIndex);
    });
    
    this.main.show();
  }
};

this.exports = trainMenu;