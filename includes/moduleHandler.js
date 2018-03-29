'use strict'
const glob = require('glob');
const path = require('path');
const Discord = require('discord.js');
const ini = require('ini');
const fs = require('fs');

const logger = require('./logger.js');
const app = require('../app.js');
const common = require('./common.js');

var comms = {};

var listenchan = app.config.general.listenchan.split(',');

//Load commands
var commcount = 0;
glob.sync('./includes/modules/**/*.js').forEach(function(file) {
	let name = file.replace('./includes/modules/','').replace('.js','');
	comms[name] = require(path.resolve(file));
	commcount++;
});

logger.log('info',`Loaded ${commcount} modules.`);

exports.parse = function(msg){
	let content = msg.content;
	let found = false;

	let authid = msg.author.id;
	let chanid = msg.channel.id;

	let comm = content.split(' ')[0].replace(app.prefix,'');
	let args = content.replace(app.prefix+comm+' ','').split(' ');

	if((msg.channel.type == 'dm' && !app.pmcomms) || (msg.channel.type != 'dm' && !listenchan.includes(chanid)) || (app.allowedusers != '' && !app.allowedusers.includes(authid))){
		return;
	}



	logger.log('info',`Command from ${msg.author.username}: ${msg.content}`)

	for(let command in comms){
		if(comm == command){
			found = true;
			if(typeof(comms[command].main) !== 'undefined'){
				comms[command].main(msg,args)
			}else{
				logger.log('warn',`User issued command "${command}", but theres no main function defined!`);
			}
		}
	}
	if(comm == 'help'){
		found = true;
		help(msg,args);
	}
	if(!found){
		common.sendMsg(msg,'Command not found! Try again.',false,30)
	}
}

exports.react = function(reaction,user,added){
	let content = reaction.message.content;
	let found = false;

	let authid = reaction.message.author.id;
	let chanid = reaction.message.channel.id;

	let comm = content.split(' ')[0].replace(app.prefix,'');
	let args = content.replace(app.prefix+comm+' ','').split(' ');


	for(let c in comms){
		if(typeof(comms[c].reactions) !== 'undefined'){
			if(comms[c].reactions.split(',').includes(reaction.emoji.identifier) || comms[c].reactions.split(',').includes(reaction.emoji.toString())){
				if(typeof(comms[c].react) !== 'undefined'){
					comms[c].react(reaction,user,added)
				}else{
					logger.log('warn',`Reaction recognized for "${c}", but command has no reaction function!`);
				}
			}
		}
	}
}

function help(msg,args){
	if(args[0] == '!help' || args[0] == 'help'){
		let rich = new Discord.RichEmbed();
		rich.setTitle('List of commands')
		rich.setDescription(`Use ${app.prefix}help <command> for a more detailed description.`)
		for(let command in comms){
			let desc;
			if(typeof(comms[command].description)!== 'undefined'){
				desc = comms[command].description;
			}else{
				desc = 'No description profided';
			}
			rich.addField(app.prefix+command,`*${desc}*`,true);
		}
		common.sendMsg(msg,rich,false,30);
	}else{
		let found = false;
		let rich = new Discord.RichEmbed();
		for(let command in comms){
			let com = args[0].replace(app.prefix,'');
			if(com == command){
				found = true;
				if(typeof(comms[com].usage) !== 'undefined'){
					rich.setTitle(`Usage info for ${com}`);
					rich.setDescription(comms[com].usage);
					common.sendMsg(msg,rich,false,30);
				}else{
					common.sendMsg(msg,'No usage information supplied by this command.');
				}
			}
		}
		if(!found){
			common.sendMsg(msg,'Could not find a command that matches that! Please try again.',false,30)
		}
	}
}