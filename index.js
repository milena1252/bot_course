require('dotenv').config();

const { TelegramBot } = require('node-telegram-bot-api');

const {
    handleMessage,
    handleCallbackQuery,
} = require('./handlers/commands');

const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error('BOT_TOKEN is not defined');
}

const bot = new TelegramBot(token, {
    polling: true,
});

bot.setMyCommands([
    {
        command: 'start', 
        description: 'Начальное приветствие',
    },
    {
        command: 'info', 
        description: 'Получить информацию о пользователе',
    },
    {
        command: 'game', 
        description: 'Игра: Угадай цифру!',
    },
]);

bot.on('message', async (msg) => {
    try {
        await handleMessage(bot, msg);
    } catch(error) {
        console.error('Message handler error:', error);
    }
});

bot.on('callback_query', async(msg) => {
    try {
        await handleCallbackQuery(bot, msg);
    } catch(error) {
        console.error('Callback handler error:', error);
    }
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('Bot started...');