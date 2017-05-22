const discord = require('discord.js');
const path = require('path');
const fs = require('fs');

const antSize = Math.pow(150, 2);
const imageUrl = 'https://i.imgur.com/P7xP9K1.jpg';

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const bot = new discord.Client();

bot.on('ready', () => {
    console.log('Bot is ready!');
    bot.user.setGame('Looking at pictures for ants');
});

bot.on('message', (message) => {
    let pictureForAnts = false;

    message.attachments.forEach((attachment) => {
        if ((attachment.width && attachment.height)
            && (attachment.width * attachment.height < antSize)
        ) {
            pictureForAnts = true;
        }
    });

    message.embeds.forEach((embed) => {
/*        if (embed.image && embed.image.width < antSize && embed.image.height < antSize) {
            pictureForAnts = true;
        }
*/
        if (embed.thumbnail && embed.thumbnail.width * embed.thumbnail.height < antSize) {
            pictureForAnts = true;
        }
    });

    if (pictureForAnts) {
        message.channel.send(' ', {embed: {image: {url: imageUrl}}}); //'Test', {embed: {url: imageUrl, width: 860, height: 530}}
    }
});

bot.login(config.token);
