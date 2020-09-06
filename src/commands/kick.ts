import { Message, GuildMember } from 'discord.js';

export default function kick(msg: Message, username: string, reason?: string): void {
  // Checking if a username was entered
  if (!username) {
    msg.channel.send('A username must be entered. <!ry kick _username_>');
    return;
  }

  // Finding the kicked user
  const kickedUser: GuildMember | null | undefined = msg.guild?.member(msg.mentions.users.first() || username);
  if (!kickedUser) {
    msg.channel.send('User does not exist.');
    return;
  }

  // Announcing to the channel the player has been kicked
  msg.channel.send(`${kickedUser.displayName} has been kicked!`);

  // Kicking the user
  kickedUser?.kick(reason ?? 'An admin has decided to kick you.');

  // Logging
  console.log(`${kickedUser.displayName} has been kicked by ${msg.author.username}`);
}
