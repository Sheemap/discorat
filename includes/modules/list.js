'use strict'
const common = require('../common.js');
const app = require('../../app.js');
const logger = require('../logger.js');




exports.usage = ``;

exports.main = function(msg,args){
	
	switch(args[0].replace(app.prefix,'')){

		case 'list':
			common.sendMsg(msg,'```'+exports.usage+'```')
			break;

		case 'guilds':
			listGuilds(msg);
			break;
	}
	
}

function listGuilds(msg){
	let rawguilds = app.client.guilds.array();

	let content = `**Guilds I have access to**\n\n`;

	for(let i=0;i<rawguilds.length;i++){
		content += `**${rawguilds[i].name}** ~ ${rawguilds[i].id}\n`
	}

	common.sendMsg(msg,content)
}