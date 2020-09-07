import { Client, Message } from 'discord.js';
import dotenv from 'dotenv';
import {
  addrole, ban, delrole, kick, mute, role, unban,
} from './commands';

// Configuring env. variables
dotenv.config();

const bot: Client = new Client();

const token: string | undefined = process.env.BOT_TOKEN;
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

    case 'kick': {
      const username: string = args[2];
      kick(msg, username);
      break;
    }

    // Creates a role
    case 'addrole': {
      const roleName: string = args[2];
      const color: string = args[3];
      addrole(msg, roleName, color);
      break;
    }

    // Deletes a role
    case 'delrole': {
      const username: string = args[2];
      const roleName: string = args[3];
      delrole(msg, username, roleName);
      break;
    }

    // Gives a member on the server an already existing role
    case 'role': {
      const username: string = args[2];
      const roleName: string = args[3];
      role(msg, username, roleName);
      break;
    }

    default:
      msg.channel.send(`${msg.member?.nickname}? More like dumbass, mothafucka does that look like a command to you?`);
      break;
  }
});

bot.login(token)
  .catch((err) => {
    console.log(`An error has occured: ${err}`);
  });
