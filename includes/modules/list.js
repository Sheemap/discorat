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

		case 'channels':
			listChans(msg,args[1]);
			break;
	}
	
}

function listChans(msg,chanid){
	let rawguilds = app.client.guilds.array();

	let content = '';

	for(let i=0;i<rawguilds.length;i++){
		if(rawguilds[i].id == chanid){

			content += `**Channels I see in ${rawguilds[i].name}**\n\n`

			let rawchans = rawguilds[i].channels.array();

			for(let w=0;w<rawchans.length;w++){11
				content += `**${rawchans[w].name}** ~ ${rawchans[w].id} ~ **${rawchans[w].type}**\n`;
			}

		}
	}

	if(content == ''){
		common.sendMsg(msg,`No guild found with ID **${chanid}**, please try again.`);
	}else{
		common.sendMsg(msg,content)
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