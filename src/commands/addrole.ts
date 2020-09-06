import { Message } from 'discord.js';

export default function addrole(msg: Message, roleName: string, color?: string): void {
  // Seeing if the role exists
  const role = msg.guild?.roles.cache.find((role_) => role_.name === roleName);
  if (!role) {
    msg.channel.send('That role already exists.');
    return;
  }

  // Creating the role
  msg.guild?.roles.create({
    data: {
      name: roleName,
      color: color ?? '#f3f3f3',
    },
  });

  // Notifying the users the channel has been created
  msg.channel.send(`The ${roleName} role has been created.`);

  // Logging
  console.log(`${msg.author.username} has created the ${roleName} role`);
}
