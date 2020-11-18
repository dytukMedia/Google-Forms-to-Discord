//Please enter your webhooks below, inside the quotations, you can have multiple, as long as you format like this: "LINK_1", "LINK_2", "LINK_3"
const webhooks = [""];

//This defines the variables, of which can be filled out; these are completely optional.

// Title can either be what you enter below, but if you leave blank, the script will fill it with the form title.
// Avatar Image is the tiny thumbnail you see on embeds, this is great for a logo.
// Short Description is great if you wish to add a tiny bit of information.
// Colour allows you to enter a custom hex color, if left blank, a colour will be randomly chosen each time.
// Mention is great if you want to be alerted, or you want a certain role alerted. Mention either the user/role in Discord with a \ at the beginning to the formatting.
// You can also put custom text into Mention if you like.
const title = "", avatarImage = "", shortDescription = "", colour = "", mention = "";

// This defines and fetches the current form, all the responses from the form, the latest response received, and the items from the q&a's from the latest res.
// Items is set up to store the Question & Answer(s)
const form = FormApp.getActiveForm(), allResponses = form.getResponses(), latestResponse = allResponses[allResponses.length - 1], response = latestResponse.getItemResponses();
var items = [];

// Just a safe check to make sure you've entered a webhook.
if (!webhooks) throw "You forgot the webhook :)";

// This loops through our latest response and fetches the Question titles/answers; then stores them in the items array above.
for (var i = 0; i < response.length; i++) {
    const question = response[i].getItem().getTitle(), answer = response[i].getResponse();
    if (answer == "") continue;
    items.push({ "name": question, "value": answer });
    function data (item) { return [`**${item.name}**`, `${item.value}`].join("\n"); }
}

// Sadly, The plain text versions formatting is ugly and messed up.
// This will be fixed at a later date.

        /*function plainText (e) {

            // A webhook construct, which sets up the correct formatting for sending to Discord.
            const text = {
                "method": "post",
                "headers": { "Content-Type": "application/json" },
                "payload": JSON.stringify({
                    "content": `${mention ? `${mention} ` : ''}${title ? `**${title}**\n` : `**${form.getTitle()}**\n`}${shortDescription ? `${shortDescription}\n\n${items.map(data).join('\n\n')}` : items.map(data).join('\n\n')}`
                }),
            };

            // We now loop through our webhooks and send them one by one to the respectful channels.
            for (var i = 0; i < webhooks.length; i++) { return UrlFetchApp.fetch(webhooks[i], text); };
        }
        */

function embedText (e) {

    // A webhook embed construct, which sets up the correct formatting for sending to Discord.
    const embed = {
        "method": "post",
        "headers": { "Content-Type": "application/json" },
        "payload": JSON.stringify({
            "content": mention ? mention : '',
            "embeds": [{
                "title": title ? title : form.getTitle(), // Either the set title or the forms title.
                "description": shortDescription ? `${shortDescription}\n\n${items.map(data).join('\n\n')}` : items.map(data).join('\n\n'),
                "thumbnail": { url: avatarImage ? encodeURI(avatarImage) : null }, // The tiny image in the right of the embed
                "color": colour ? parseInt(colour.substr(1), 16) : Math.floor(Math.random() * 16777215), //Either the set colour or random.
                "timestamp": new Date().toISOString()
            }]
        }),
    };

    // We now loop through our webhooks and send them one by one to the respectful channels.
    for (var i = 0; i < webhooks.length; i++) { return UrlFetchApp.fetch(webhooks[i], embed); };
}
