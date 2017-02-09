var UI = require('ui');

/*
 * Detailed information for the schedule entry we selected.
 * Show the line path, departure time, arrival time, track #, status, etc.
 */
var scheduleInfo = {                          
  main: null,                   
  open : function(json, index, startsta, endsta) {
      this.main = new UI.Menu({
      sections: [{
        title: startsta + " to " + endsta,
        items: [{
          title: json[index].departs,
          subtitle: "Departs"
        }, {
          title: json[index].track,
          subtitle: "Track"
        }, {
          title: json[index].status,
          subtitle: "Status"
        }, {
          title: json[index].eta,
          subtitle: "Arrive at " + json[index].for
        }]
      }]
    });
    
    this.main.show();
  }
};

this.exports = scheduleInfo;