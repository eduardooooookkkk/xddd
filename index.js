const Discord = require('discord.js'); //Definimos discord
const { Client, Intents, MessageEmbed, Collection, Guild } = require('discord.js');
const intents = new Discord.Intents(14023)
const client = new Discord.Client({ intents })
const fs = require('fs'); //Definimos fs
let { readdirSync } = require('fs'); //Definimos readdirSync que también lo necesitamos


   console.log("listo")

   const time = (1000*5)

   let status = [
   [{
     name: '.help',
     type: 'WATCHING'

     }],
    [{
         name: '.commands',
         type: 'WATCHING'
         }]
         ]
         setInterval(()=> {

           function randomStatus() {
             let rstatus = status[Math.floor(Math.random() * status.length)];
             client.user.setPresence({ activities: rstatus, status: 'online'});




            }
            randomStatus();
          }, time )

         

////////////////////////HANDLER//////////////////////////
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}



//Eventos
for(const file of readdirSync('./eventos/')) { 
  if(file.endsWith(".js")){
  let fileName = file.substring(0, file.length - 3); 
  let fileContents = require(`./eventos/${file}`); 
  client.on(fileName, fileContents.bind(null, client));}}

client.on('messageCreate', (message) => {

let prefix = '.'

if(message.channel.type === "dm") 
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)
}
  
    });

client.login("token")
