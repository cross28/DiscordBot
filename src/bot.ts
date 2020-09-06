import { Client, Message } from 'discord.js';
import mute from './commands/mute';
import kick from './commands/kick';
import ban from './commands/ban';
import unban from './commands/unban';

const bot: Client = new Client();

const token = '';
const prefix = '!ry';

bot.on('ready', () => {
  console.log('This bot is online');
});

// Commands
bot.on('message', (msg: Message) => {
  // If a member on the server sends a message that doesn't start with our prefix
  if (!msg.content.startsWith(prefix)) return;

  // Splits the message into respective arguments
  const args: string[] = msg.content.substring(prefix.length).split(' ');

  switch (args[1]) {
    case 'mute': {
      const mutedUser: string = args[2];
      const time: string = args[3];
      mute(msg, mutedUser, time);
      break;
    }

    case 'ban': {
      const username: string = args[2];
      const days: number = Number.parseInt(args[3], 10);
      let reason = '';
      for (let i = 4; i < args.length; i += 1) reason += args[i];
      ban(msg, username, days, reason);
      break;
    }

    case 'unban': {
      const username: string = args[2];
      unban(msg, username);
      break;
    }

    case 'softban':
      if (!args[2]) msg.channel.send('A username must be entered. <!ry softban _username_>');
      break;

    case 'kick': {
      const username: string = args[2];
      kick(msg, username);
      break;
    }

    // Creates a role
    case 'addrole':

      break;
    // Gives a member on the server an already existing role
    case 'role':

      break;

    default:
      msg.channel.send(`${msg.member?.nickname}? More like dumbass, mothafucka does that look like a command to you?`);
      break;
  }
});

bot.login(token);
