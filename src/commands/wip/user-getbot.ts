import { Command, Logger, logger, Message } from '@yamdbf/core';

import { IMClient } from '../../client';
import { CommandGroup, createEmbed, sendEmbed } from '../../utils/util';

export default class extends Command<IMClient> {
	@logger('Command') private readonly _logger: Logger;

	public constructor() {
		super({
			name: 'getbot',
			aliases: ['get-bot', 'invite-bot', 'inviteBot'],
			desc: 'Get an invite Link for the bot',
			usage: '<prefix>getbot',
			group: CommandGroup.Other,
			guildOnly: false
		});
	}

	public async action(message: Message, args: string[]): Promise<any> {
		this._logger.log(
			`${message.guild ? message.guild.name : 'DM'} (${message.author.username}): ${message.content}`
		);

		const embed = createEmbed(this.client);

		let params = [];
		if (message.guild) {
			params.push(`origin=getbot`);
			if (message.guild) { params.push(`guild=${message.guild.id}`); }
			params.push(`user=${message.author.id}`);
		}
		embed.setDescription(
			`[Add InviteManager to your server]` +
			`(https://invitemanager.co/add-bot?${params.join('&')})`
		);

		sendEmbed(message.channel, embed, message.author);
	}
}
