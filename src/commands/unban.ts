import { Message, GuildMember, User } from 'discord.js';

export default function unban(msg: Message, username: string): void {
  // Going through the list of banned players on the server
  msg.guild?.fetchBans()
    .then((bans) => {
      if (bans.size === 0) return;

      // Finding the banned user
      const user: GuildMember | null | undefined = msg.guild?.member(msg.mentions.users.first() || username);
      if (!user) return;
      const bannedUser: User | undefined = bans.find((ban) => ban.user.id === user.id)?.user;
      if (!bannedUser) return;

      // Unbanning the user
      msg.guild?.members.unban(bannedUser);

      // Notifying the user and channel they have been unbanned
      bannedUser.send(`You have been unbanned from ${msg.channel.toString()}`);
      msg.channel.send(`${bannedUser.username} has been unbanned from the server.`);

      // Logging
      console.log(`${bannedUser.username} has been unbanned from ${msg.channel.toString()} by ${msg.author.username}.`);
    })
    .catch((err) => {
      console.log(`An error has occured: ${err}`);
    });
}
