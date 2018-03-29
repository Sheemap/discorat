# discorat
Remote Admin Tool for Discord bots. It is essentially a proof of concept of what can happen if your bot token is stolen. Made for educational purposes only.

# Features
* Listing - Can show you all guilds, channels, and members that it can see. Often times this is more than a basic user account.
* Server cloning - Clones a server to one you control, forwarding all messages. This allows you to see hidden channels which the bot can see but you cannot.
* Channel spying - If cloning is not an option, can spy on a specified channel, will forward all messages to you.

# Planned features
* Server logging to filesystem - Same as server cloning, but logs to filesystem instead of other discord server.
* Admin actions - Kick and ban users, create, rename and delete channels, delete server.
* Send messages - Send messages on behalf of bot.

# Installation
Simple install, run ```npm install`` inside the cloned directory. Has only been tested with node v8.9.0 and linux. After install, rename config.ini.example to config.ini and adjust values accordingly.
