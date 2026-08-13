const { startGame, handleGameCallback } = require('./game');

const handleMessage = async (bot, msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
        await bot.sendSticker(
            chatId,
            './stickers/sticker2.webp'
        );

        return bot.sendMessage(
            chatId, 
            `Добро пожаловать в телеграм бот Yosya! 🚀`
        );
    }

    if (text === '/info') {
        return bot.sendMessage(
            chatId, 
            `Тебя зовут ${msg.from.first_name} ${msg.from.username || ''}`
        );
    }

    if (text === '/game') {
        return startGame(bot, chatId);
    }

    return bot.sendMessage(
        chatId, 
        'Я тебя не понимаю, попробуй еще раз!'
    );
};

const handleCallbackQuery = async (bot, msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    await bot.answerCallbackQuery(msg.id);

    return handleGameCallback(bot, chatId, data);
};

module.exports = {
    handleMessage,
    handleCallbackQuery,
};