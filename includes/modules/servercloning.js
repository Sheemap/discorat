'use strict'
const common = require('../common.js');
const app = require('../../app.js');
const logger = require('../logger.js');

const enabled = app.config.servercloning.enabled;

if(enabled){
	const sourceid = app.config.servercloning.source;
	const destid = app.config.servercloning.destination;

	const guilds = app.client.guilds.array();

	var source;
	var dest;

	let validsource = false;
	let validdest = false;

	for(let i=0;i<guilds.length;i++){
		if(guilds[i].id == sourceid){
			validsource = true;
			source = guilds[i];
		}
		if(guilds[i].id == destid){
			validdest = true;
			dest = guilds[i];
		}

	}
	
	if(!validdest){
		logger.log('error','Invalid cloning destination! Disabled cloning.');
	}
	if(!validsource){
		logger.log('error','Invalid cloning source! Disabled cloning.')
	}

	if(validsource && validdest){

		let destchannels = dest.channels.array();
		let sourcechannels = source.channels.array();

		for(let i=0;i<destchannels.length;i++){
			destchannels[i].delete();
		}

		let chan;
		for(let i=0;i<sourcechannels.length;i++){
			chan = sourcechannels[i]
			dest.createChannel(chan.name+'~-~'+chan.id,chan.type)
		}

	}

}

exports.spy = function (msg){
	let chans = dest.channels.array();
	let attachments = msg.attachments.array();
	let attach = [];

	for(let i=0;i<attachments.length;i++){
		attach.push(attachments[i].url)
	}

	for(let i=0;i<chans.length;i++){
		if(chans[i].name.includes(msg.channel.id)){
			common.sendChannel(chans[i].id,`**${msg.author.username}:** ${msg.content}`,{files: attach});
		}
	}
}