'use strict'
const logger = require('./logger.js');
const app = require('../app.js');

exports.sendMsg = function(msg,content,reply){
    if(reply){
		msg.reply(content).then(message => cb(message));//.then(message => sent=message);//
    }else{
		msg.channel.send(content).then(message => cb(message));//.then(message => sent=message);//
    }
}

exports.sendChannel = function(chan,content,attach,callback){
    
    let all_channels = app.client.channels.array();
    let channel = '';

    for(let c in all_channels){
        if(all_channels[c].id == chan){
            channel = all_channels[c];
        }
    }

    if(channel !== ''){
        channel.send(content,attach).then(message => cb(message,callback));//.then(message => sent=message);//
    }else{
        logger.log('error',`Attempted to send message to nonexistent channel! Channel: ${channel.id}`)
    }


   
}

function cb(message,callback){

    if(typeof(callback) !== 'undefined'){
        callback(message);
    }
}