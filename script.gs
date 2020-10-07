/*
        Feel free to contact me if you need assistance. I'll happily help :) https://danielytuk.co.uk/go/discord
        Fill in what you want and what you don't, the code is smart so it'll know what you've chosen.
*/

const webhooks = [ "" ];

/* Start of optional section */
const title = ""; /*    Add a nice custom title, to make the script truly yours.    */
const avatarImage = ""; /*    The logo of your brand or Discord server, maybe?    */
const shortDescription = ""; /*    A little bit of information about the response received, so you don't forget in the future?    */
const colour = ""; /*    A custom colour? Example: #78A8C6    */
const mention = ""; /*Mention yourself or a role - it should look like <@!7890975289098612689> or <@&7890975289098612689>    */
/* End of optional section */


/*
        PLEASE DO NOT MESS WITH THE CODE BELOW IF YOU DON'T KNOW WHAT YOU'RE DOING.
            I haven't got all day to troubleshoot issues, caused by tampering.
                This warning was added after the recording of the new video.
                        https://www.youtube.com/watch?v=3OWl38WHCfE
*/


const form = FormApp.getActiveForm();
const allResponses = form.getResponses();
const latestResponse = allResponses[ allResponses.length - 1 ];
const response = latestResponse.getItemResponses();
var items = [];

if ( !webhooks ) throw "You forgot the webhook :)";

function plainText( e ) {
    for ( var i = 0; i < response.length; i++ ) {
        const question = response[ i ].getItem().getTitle();
        const answer = response[ i ].getResponse();
        const parts = answer.match( /[\s\S]{1,1024}/g ) || [];

        if ( answer == "" ) continue;
        for ( var j = 0; j < parts.length; j++ ) { if ( j == 0 ) items.push( { "name": question, "value": parts[ j ] } ); }

        function data( item ) { return [ `**${ item.name }**`, `${ item.value }` ].join( "\n" ); }
    }
    
    try {
      const textSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, "payload": JSON.stringify( { "content": `${ ( mention ) ? `${ mention } ` : `` } ${ ( title ) ? `**${ title }**` : `**${ form.getTitle() }**` }\n${ ( shortDescription ) ? `${ shortDescription }\n\n---\n\n` : `---\n\n` }${ items.map( data ).join( "\n\n" ) }` } ) };
      for ( var i = 0; i < webhooks.length; i++ ) { UrlFetchApp.fetch( webhooks[ i ], textSetup ); }
      return form.deleteResponse( latestResponse.getId() );
    } catch(error) {return;}
}

function embedText( e ) {
    for ( var i = 0; i < response.length; i++ ) {
        const question = response[ i ].getItem().getTitle();
        const answer = response[ i ].getResponse();

        if ( answer == "" ) continue;
        items.push( { "name": question, "value": answer } );

        function data( item ) { return [ `**${ item.name }**`, `${ item.value }` ].join( "\n" ); }
    }

    try {
      if ( avatarImage !== null ) {
          const embedSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify( { "content": ( mention ) ? `${ mention }` : " ", "embeds": [ { "title": ( title ) ? title : form.getTitle(), "thumbnail": { "url": encodeURI( avatarImage ) }, "color": ( colour ) ? parseInt(colour.substr(1), 16) : Math.floor( Math.random() * 16777215 ), "description": ( shortDescription ) ? `${ shortDescription }\n\n${ items.map( data ).join( '\n\n' ) }` : items.map( data ).join( '\n\n' ), "timestamp": new Date().toISOString(), } ] } ) };
          for ( var i = 0; i < webhooks.length; i++ ) { UrlFetchApp.fetch( webhooks[ i ], embedSetup ); }
          return form.deleteResponse( latestResponse.getId() );
      } else {
          const embedSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify( { "content": ( mention ) ? `${ mention }` : " ", "embeds": [ { "title": ( title ) ? title : form.getTitle(), "color": ( colour ) ? parseInt(colour.substr(1), 16) : Math.floor( Math.random() * 16777215 ), "description": ( shortDescription ) ? `${ shortDescription }\n\n${ items.map( data ).join( '\n\n' ) }` : items.map( data ).join( '\n\n' ), "timestamp": new Date().toISOString(), } ] } ) };
          for ( var i = 0; i < webhooks.length; i++ ) { UrlFetchApp.fetch( webhooks[ i ], embedSetup ); }
          return form.deleteResponse( latestResponse.getId() );
      }
    } catch(error) {return;}
}
