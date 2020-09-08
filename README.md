# RyBot
Rybot is a small multipurpose discord bot meant for managing players on a server, and encouraging interaction with a built in economy system and Youtube streamer.

RyBot includes:
- YouTube audio streaming in a voice channel
- Economy system where members of a server are able to buy permissions for a limited amount of time.
- Server management such as muting, kicking, banning, etc;

# Running Locally

1. Make sure you're in the top directory of the project and run `npm install` to automatically install the node dependencies.
2. Change the `.env.example` file to `.env`. The correct credentials will have to be placed in the quotations. To get your Discord Bot token, you'll have to create a new application on the Discord website.
    - On Discord you'll also want to activate Developer Mode under Appearance in the settings.
3. FFmpeg will have to be installed for your OS environment. Here's [how](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/) to do that.