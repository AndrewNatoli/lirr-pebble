/*
 * Display the schedule for the selected route
 */
var UI = require('ui');

var trainSchedule = {                          
  main: null,     
  loadingCard: null,
  
  createSchedule: function(json, startsta, endsta) {
    this.list = new UI.Menu();
    
    var items = [];
    // Go through the schedule and create the row data...
    for(var i in json) {
      var track = "";
      if(json[i].track != "--") {
        track = " (" + json[i].track + ")";
      } else {
        track = "";
      }
      var item = {
        title: json[i].departs,
        subtitle: json[i].status + track
      };
      items.push(item);
    }
    
    // Create a section for the menu...
    var section = {
      title: startsta + " to " + endsta,
      items: items
    };
    
    // Add the section to the menu...
    this.list.section(0, section);
    
    // When you click on this schedule entry we'll fetch specific details for it (like the track #)
    this.list.on('select', function(e) {
      var infoWindow = require("trainscheduleinfo");
      infoWindow.open(json, e.itemIndex, startsta, endsta);
    });
    
    // Hide the loading card and show the menu! :D
    if(typeof this.loadingCard != "undefined") {
      this.loadingCard.hide(); 
    }
    
    this.list.show();
  },
  
  open : function(menuIndex) {
    // Create a loading card
    this.loadingCard = new UI.Card({
      title: "Please Wait",
      body: "Loading..."
    });
    
    this.loadingCard.show();
    
    /*
     * Load a schedule corresponding to our menu choice.
     * Edit this and trainmenu.js to add more lines
     * RNK to NYK - 0 
     * NYK to RNK - 1 
     */
    var startsta = "";
    var endsta = "";
    switch(menuIndex) {
      case 0:
        startsta = "RON";
        endsta = "NYK";
        break;
      case 1:
        startsta = "NYK";
        endsta = "RON";
        break;
    }
    
    // Change this URL of course
    var url = "http://pebble.myapp.com/train_schedule/?";
    url += "startsta=" + startsta + "&endsta=" + endsta;
    console.log(url);
    var ajax = require('ajax');
    // I sometimes make useless var names for disposable objects in my personal projects... don't judge. It's my own "foo bar" language.
    var biscuit = this.loadingCard; // So we can reference this inside the ajax request
    var basket = this;
    ajax({url: url, type: 'json'},
      function(json) {
        basket.createSchedule(json, startsta, endsta);
      },
      function(error) {
        console.log("Loading failed...");
        console.log(error);
        var failCard = new UI.Card({
          title: "Error",
          body: "Loading failed :("
        });
        
        biscuit.hide();
        failCard.show();
      }
    );
  }
};

this.exports = trainSchedule;