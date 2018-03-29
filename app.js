//Packages
const Discord = require("discord.js");
const client = exports.client = new Discord.Client();
const ini = require('ini');
const fs = require('fs');

//Config
const config = exports.config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

const token = config.general.token;
const prefix = exports.prefix = config.general.commandprefix;
const pmcomms = exports.pmcomms = config.general.pmcomms;

exports.logDir = logDir = config.general.logdir;

var allowedusers = exports.allowedusers = '';
if(config.general.users != ''){
	allowedusers = exports.allowedusers = config.general.users;
}


//Custom Packages
const logger = require('./includes/logger.js');
var cloner,
	chanspy,
	handler;

function loadAfterLogin(){
	handler = require('./includes/moduleHandler.js');
	chanspy = require('./includes/modules/channelspy.js');
	cloner = require('./includes/modules/servercloning.js');
}


if(token == ''){
	logger.log('error','Bot token not set! Set it in the config file.');
	process.exit();
}



client.on('ready', () => {
    exports.BOTID = BOTID = client.user.id;
    logger.log('info',`Logged in as ${client.user.tag}`);
    loadAfterLogin();
});

client.on('message', msg => {

	if(msg.content.startsWith(prefix)){
		handler.parse(msg);
	}

	//channelspy
	if(msg.channel.id == chanspy.channel && chanspy.enable){
		chanspy.parse(msg);
	}

	//serverspy
	if(msg.channel.type != 'dm' && msg.guild.id == config.servercloning.source){
		cloner.spy(msg);
	}

});


client.login(token);