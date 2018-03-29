//Packages
const Discord = require("discord.js");
const client = exports.client = new Discord.Client();
const ini = require('ini');
const fs = require('fs');

//Config
const config = exports.config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

const token = config.general.token;
exports.logDir = logDir = config.general.logdir;


//Custom Packages
const logger = require('./includes/logger.js');
var cloner;

function loadAfterLogin(){
	const handler = require('./includes/moduleHandler.js')

	cloner = require('./includes/modules/servercloning.js')
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

	//serverspy
	if(msg.guild.id == config.servercloning.source){
		cloner.spy(msg);
	}

});


client.login(token);