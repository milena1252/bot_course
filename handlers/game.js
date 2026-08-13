const { gameOptions, againOptions } = require('../options');

const games = {};

const startGame = async (bot, chatId) => {
    const randomNumber = Math.floor(Math.random() * 10);

    games[chatId] = randomNumber;

    await bot.sendMessage(
        chatId, 
        'Сейчас я загадаю цифру от 0 до 9, а ты должен ее отгадать!'
    );

    return bot.sendMessage(
        chatId, 
        'Отгадывай!', 
        gameOptions
    );   
};

const handleGameCallback = async (bot, chatId, data) => {
    if(data === '/again') {
        return startGame(bot, chatId);
    }

    const correctNumber = games[chatId];

    if (correctNumber === undefined) {
        return bot.sendMessage(
            chatId,
            'Сначала начни игру с помощью команды /game'
        );
    }

    if (Number(data) === correctNumber) {
        return bot.sendMessage(
            chatId,
            `🎉 Поздравляю! Ты отгадал цифру ${correctNumber}`,
            againOptions
        );
    }

    return bot.sendMessage(
        chatId,
        `❌ К сожалению, ты не угадал. Бот загадал цифру ${correctNumber}`,
        againOptions
    );
};

module.exports = {
    startGame,
    handleGameCallback,
};