import { Client, Message, VoiceChannel, VoiceConnection } from 'discord.js';
import { BOT_TOKEN } from './config';
import { addrole, ban, delrole, kick, mute, role, unban } from './commands';
import { createUser, updateCurrency, getCurrency } from './database';
import play from './audio/audio-stream-helper';

const bot: Client = new Client();

const prefix = '!ry';
try {
  bot.on('ready', () => {
    console.log('This bot is online');
  });

  // Commands
  bot.on('message', async (msg: Message) => {
  // If a member on the server sends a message that doesn't start with our prefix
    if (!msg.content.startsWith(prefix)) return;

    try {
    // Attempting to create the user if the user doesn't exist in the database
      createUser(msg.author.id, msg.author.username);
    } catch (err) {
      console.log(err);
    }

    // Splits the message into respective arguments
    const args: string[] = msg.content.substring(prefix.length).split(' ');

    switch (args[1]) {
      case 'mute': {
        const mutedUser: string = args[2];
        const time: string = args[3];
        await updateCurrency(msg.author.id, 1);
        mute(msg, mutedUser, time);
        break;
      }

      case 'ban': {
        const username: string = args[2];
        const days: number = Number.parseInt(args[3], 10);
        let reason = '';
        for (let i = 4; i < args.length; i += 1) reason += `${args[i]} `;
        await updateCurrency(msg.author.id, reason.length ?? 1);
        ban(msg, username, days, reason);
        break;
      }

      case 'unban': {
        const username: string = args[2];
        await updateCurrency(msg.author.id, 1);
        unban(msg, username);
        break;
      }

      case 'kick': {
        const username: string = args[2];
        await updateCurrency(msg.author.id, 1);
        kick(msg, username);
        break;
      }

      // Creates a role
      case 'addrole': {
        const roleName: string = args[2];
        const color: string = args[3];
        await updateCurrency(msg.author.id, 1);
        addrole(msg, roleName, color);
        break;
      }

      // Deletes a role
      case 'delrole': {
        const username: string = args[2];
        const roleName: string = args[3];
        await updateCurrency(msg.author.id, 1);
        delrole(msg, username, roleName);
        break;
      }

      // Gives a member on the server an already existing role
      case 'role': {
        const username: string = args[2];
        const roleName: string = args[3];
        await updateCurrency(msg.author.id, 1);
        role(msg, username, roleName);
        break;
      }

      // Getting the authors currency
      case 'getmoney': {
        const currency: number = await getCurrency(msg.author.id);
        msg.channel.send(`${msg.author.username}'s wallet: ${currency}`);
        break;
      }

      // Stream Twitch audio to voice channel
      case 'play': {
        const url: string = args[2];
        const voiceChannel: VoiceChannel | null | undefined = msg.member?.voice.channel;

        // Seeing if the requester is in a voice channel
        if (!voiceChannel) {
          msg.channel.send('You must be in a voice channel.');
          return;
        }

        // Joining the voice channel
        await voiceChannel.join().then((con) => {
          play(con, url);
        }).catch((err) => {
          console.log(err);
          voiceChannel.leave();
        });

        break;
      }

      case 'stop': {
      // If the bot is in the voice channel
        const voiceChannel: VoiceChannel | null | undefined = msg.guild?.me?.voice.channel;
        if (!voiceChannel) return;

        // Disconnect from the voice channel to stop the audio
        voiceChannel.join().then((con: VoiceConnection) => con.disconnect());

        break;
      }

      default:
        msg.channel.send('That is not a command. Try again.');
        break;
    }
  });
} catch (err) {
  console.log(err);
}

bot.login(BOT_TOKEN)
  .catch((err) => {
    console.log(`An error has occured: ${err}`);
  });
