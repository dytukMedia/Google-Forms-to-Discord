<a href='http://dytuk.me/discord' target='_blank'>![alt Discord](https://img.shields.io/discord/659873886271438848?color=7289da&logo=discord&logoColor=white)</a> <a href='https://dytuk.me/support' target='_blank'>![alt support](https://img.shields.io/badge/donate-free%2Fpaid-blue)</a>

# Google Forms to Discord (GF2D)
Google Forms to Discord, GF2D for  short, is a free Google Apps Script,

which allows you to send submitted responses to a selected Discord server channel for easy viewing / access.

This is perfect for Staff/Appeal Applications, sign-ups, and more.



# Setup

Create a Google Form or use an existing one.

Click on the Traffic Lights (three dots in a vertical line) and click Script Editor.

Once loaded, copy the code from `script.gs` and paste it into the editor.

Now, you'll want to go and open Discord.

- Go into the server - select the channel you wish to send the responses to.
- Right click (or hold) on the channel to see the menu.
- Click Edit Channel.
- Scroll and look for Intregrations - click it.
- Click **Create Webhook**.
- Enter a name, select an image and copy the URL.

Going back to the script editor, paste your URL into the webhook varible like below:


```JS
const webhooks ['WEBHOOK_URL'];
```

You may now fill in the code below, or save and test the script.

```JS
const title = "Dummy form",
avatarImage = "https://example.com/logo.png",
shortDescription = "This is a form",
colour = "#FFFFFF",
mention = "<@!587159874125635874>";
```

# Important Step

If you'd like the responses to be sent automatically.

You must set up a Trigger.

# Trigger Setup

- Click on the ⏲ (located next to the 💾 button)
- Click the button **Add Trigger**.
- Change **Select event type** to **On form submit**.
- Press save.

You'll be prompted to authorise your account.

A new window will open and asking you to sign into your Google Account.

Once selecting your account, a page will say **This app isn't verified**.

- Click on Advanced.
- Go to **Project Name**.
- Press allow.

Now, the script will automatically run when a new response is submitted.

# Support

If you're running into issues or are having trouble setting everything up.
You can watch the [YouTube Video](https://www.youtube.com/watch?v=3OWl38WHCfE).

If you're still having trouble, please join the [Discord server](https://dytuk.me/discord) and ask in the `#support` channel.
