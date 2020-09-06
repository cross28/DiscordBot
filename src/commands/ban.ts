import { Message, GuildMember } from 'discord.js';

export default function ban(msg: Message, username: string, days?: number, reason?: string): void {
  // Checking if a username was entered
  if (!username) {
    msg.channel.send('A username must be entered. <!ry ban _username_ _days (optional)_ "_reason (optional)_">');
    return;
  }

  // Checking if days were entered and if they were less than 3 days
  if (days && days > 3) {
    msg.channel.send('The maximum number of bannable days is 3.');
    return;
  }

  // Finding the banned user
  const bannedUser: GuildMember | null | undefined = msg.guild?.member(msg.mentions.users.first() || username);
  if (!bannedUser) {
    msg.reply('Could not find a user by that name.');
    return;
  }

  // Announcing to the channel the player has been banned
  msg.channel.send(`${bannedUser.displayName} has been banned for ${days ?? 1} days!`);
  bannedUser.send(`An admin has decided to ban you for ${days ?? 1} days.`);

  // Banning the user
  bannedUser.ban({
    reason: reason ?? 'An admin has decided to ban you for no reason.',
    days: days ?? 1,
  });
}
