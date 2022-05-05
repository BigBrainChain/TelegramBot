process.env["NTBA_FIX_319"] = 1;
require('dotenv').config()
const {Telegraf, Markup} = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN


const bot = new Telegraf(BOT_TOKEN)

const websiteKeyboard = Markup.inlineKeyboard([
  Markup.button.url('Twitter', 'https://twitter.com/BigBrainChain_'),
])

bot.start((ctx) =>
   ctx.reply('Hi! I am a Bot with a Big Brain!'))

bot.help((ctx) =>
   ctx.reply('/help - listet dir die nützlichsten Befehle\r\n/links - show the important links '))   

bot.command('links', (ctx) => 
      ctx.reply('Important links for BigBrains:', websiteKeyboard))



bot.launch()
