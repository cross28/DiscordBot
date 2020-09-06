import ms from 'ms';

import { Message } from 'discord.js';

export default function mute(msg: Message, username: string, time: string): void {
  // No username entered
  if (!username) {
    msg.channel.send('A username must be entered. <!ry mute @_username_ *time*>');
    return;
  }

  // No time entered or time is greater than 5 minutes
  if (!time || ms(time) > 300000) {
    msg.channel.send('A valid time must must be entered (5 minute max.). <!ry mute @_username_ _time_>');
    return;
  }

  // Finding the member to mute
  const mutedMember = msg.guild?.member(msg.mentions.users.first() || username);
  if (!mutedMember) {
    msg.reply('Could not find anybody by that username');
    return;
  }

  // Checking to see if the roles exist
  const memberrole = msg.guild?.roles.cache.find((role) => role.name === 'member');
  const muterole = msg.guild?.roles.cache.find((role) => role.name === 'muted');
  if (!memberrole || !muterole) {
    msg.reply('The member role or mute role does not exist. Creating the roles now...');
    msg.reply('Run the command again.');

    // Creating the member and mute role
    msg.guild?.roles.create({ data: { name: 'muted', color: 'a8102f' } });
    msg.guild?.roles.create({ data: { name: 'member', color: '018af2' } });

    return;
  }

  // Making the member apart of the muted role and not the regular
  mutedMember?.roles.remove(memberrole.id);
  mutedMember?.roles.add(muterole.id);

  // Letting channel know the user got muted for a period of time
  msg.channel.send(`${mutedMember?.displayName} has been muted for ${ms(ms(time), { long: true })}`);

  // Muting the member
  setTimeout(() => {
    mutedMember.roles.add(memberrole.id);
    mutedMember.roles.remove(muterole.id);

    msg.channel.send(`${mutedMember?.displayName} has been unmuted.`);
  }, ms(time));
}
