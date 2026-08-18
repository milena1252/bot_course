const { menuOptions } = require('../options');
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
            `Добро пожаловать в телеграм бот Yosya! 🚀\n\nВыбери действие:`,
            menuOptions
        );
    }

    if (text === '/info' || text === '👤 Моя информация') {
        return bot.sendMessage(
            chatId, 
            `Тебя зовут ${msg.from.first_name}\n` +
            `Username: ${
                msg.from.username
                    ? '@' + msg.from.username
                    : 'не указан'
            }`
        );
    }

    if (text === '/game' || text === '🎮 Играть') {
        return startGame(bot, chatId);
    }

    if (text === '❓ Помощь') {
        return bot.sendMessage(
            chatId,
            `❓ Помощь

            🎮 Играть — запустить игру «Угадай цифру»
            👤 Моя информация — посмотреть информацию о пользователе
            ❓ Помощь — показать это сообщение

            Также доступны команды:
            /start
            /info
            /game`
        );
    }

    return bot.sendMessage(
        chatId, 
        'Я тебя не понимаю, попробуй еще раз! 🤔'
    );
};

const handleCallbackQuery = async (bot, msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    await bot.answerCallbackQuery(msg.id);

    if (data === '/menu') {
        return bot.sendMessage(
            chatId,
            '🏠 Главное меню\n\nВыбери действие:',
            menuOptions,
        );
    }

    return handleGameCallback(bot, chatId, data);
};

module.exports = {
    handleMessage,
    handleCallbackQuery,
};