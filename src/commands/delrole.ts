import { Message, GuildMember } from 'discord.js';

export default function delrole(msg: Message, username: string, roleName: string): void {
  // Seeing if the role exists
  const role = msg.guild?.roles.cache.find((role_) => role_.name === roleName);
  if (!role) {
    msg.channel.send('That role does not exist.');
    return;
  }

  // Seeing if the user exists
  const user: GuildMember | undefined | null = msg.guild?.member(msg.mentions.users.first() || username);
  if (!user) {
    msg.channel.send('That user does not exist');
    return;
  }

  // Removing the role from the member
  user.roles.remove(role.id);

  // Notifying the channel
  msg.channel.send(`${msg.author.username} has removed the ${role.name} role from ${user.displayName}.`);

  // Logging
  console.log(`${msg.author.username} has removed the ${role.name} role from ${user.displayName}.`);
}
