import ytdl from 'ytdl-core-discord';
import { VoiceConnection } from 'discord.js';

export default async function play(connection: VoiceConnection, url: string): Promise<void> {
  connection.play(await ytdl(url), { type: 'opus', volume: 1 });
}
