import { Message, GuildMember, Role } from 'discord.js';

export default function role(msg: Message, username: string, roleName: string): void {
  // Finding the user
  const user: GuildMember | null | undefined = msg.guild?.member(msg.mentions.users.first() || username);
  if (!user) {
    msg.channel.send('User not found');
    return;
  }

  // Finding the role
  const roleToAssign: Role | undefined = msg.guild?.roles.cache.find((role_) => role_.name === roleName);
  if (!roleToAssign) {
    msg.channel.send('Role does not exist');
    return;
  }

  // Assigning the user to the role
  user.roles.add(roleToAssign.id);

  // Notifying the channel
  msg.channel.send(`${user.displayName} has been assigned the ${roleToAssign.name} role.`);

  // Logging
  console.log(`${msg.author.username} has assigned ${user.displayName} to the ${roleToAssign.name} role.`);
}
