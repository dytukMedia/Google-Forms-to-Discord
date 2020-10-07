/*
Hello everyone,

I have recently fixed a few bugs that stopped the form sending to Discord.
If any other issues pop up, please let me know: https://danielytuk.co.uk/go/discord

I will try to provide as much help as possible, however I am not a genius and do not know everything.
This script was found online and, re-adjusted to better match what everyone was asking for / what I needed.
*/





/* Please paste your Discord Webhook URL in the "" below. */
var webhook = "";
/* Format your message below, leave blank to use default. */
var msg = ""


function textSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();
  var latestResponse = allResponses[allResponses.length - 1];
  var response = latestResponse.getItemResponses();
  var items = [];

  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    var parts = answer.match(/[\s\S]{1,1024}/g) || [];

    if (answer == "") continue;
    for (var j = 0; j < parts.length; j++) {
      if (j == 0) items.push({ "name": question, "value": parts[j] });
    }
    
    function data(item) {
      var qa = ["**" + item.name + "**",item.value].join("\n");
      return qa;
    }
    
  }
  
  if(!webhook) throw new Error( "Missing: Discord Webhook URL" );

  if(msg) {
    var options = {"method": "post", "headers": { "Content-Type": "application/json"}, "payload": JSON.stringify({content: msg + "\n\n" + items.map(data).join('\n\n')})};
  } else {
    var options = {"method": "post", "headers": { "Content-Type": "application/json"}, muteHttpExceptions: true, "payload": JSON.stringify({content: "**New Form Submission**\n-----------------\n\n" + items.map(data).join('\n\n')})};
  }
  UrlFetchApp.fetch(webhook, options);
};
