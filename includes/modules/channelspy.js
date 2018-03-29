'use strict'
const common = require('../common.js');
const app = require('../../app.js');
const logger = require('../logger.js');

var enable = exports.enable = false;
var channel = exports.channel = '';
var forward = '';

exports.main = function(msg,args){
	switch(args[0].replace(app.prefix,'')){

		case 'channelspy':
			common.sendMsg(msg,'```'+exports.usage+'```');
			break;

		case 'disable':
			enable = exports.enable = false;
			channel = exports.channel = '';
			common.sendMsg(msg,'Channel spy is now disabled.');
			break;

		default:
			startSpy(msg,args[0]);
			break;
	}
}

function startSpy(msg,chanid){

	let rawguilds = app.client.guilds.array();
	let found = false;

	for(let i=0;i<rawguilds.length;i++){

		let rawchans = rawguilds[i].channels.array();

		for(let w=0;w<rawchans.length;w++){11
			
			if(rawchans[w].id == chanid){
				found = true;
			}

		}

	}

	if(found){
		enable = exports.enable = true;
		channel = exports.channel = chanid;
		forward = msg.channel.id;
		common.sendMsg(msg,`Channel spy enabled on channel **${chanid}**. Forwarding messages to **${forward}**.`)
	}else{
		common.sendMsg(msg,`Couldnt find a channel with that ID! Try again.`)
	}

}

exports.parse = function(msg){
	let attachments = msg.attachments.array();
	let attach = [];

	for(let i=0;i<attachments.length;i++){
		attach.push(attachments[i].url)
	}

	common.sendChannel(forward,`**${msg.author.username}:** ${msg.content}`,{files: attach});
}