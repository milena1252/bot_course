const { gameOptions, againOptions } = require('../options');

const games = {};

const startGame = async (bot, chatId) => {
    const randomNumber = Math.floor(Math.random() * 10);

    games[chatId] = {
        randomNumber,
        attempts: 0,
    };

    await bot.sendMessage(
        chatId, 
        '🎯 Я загадал цифру от 0 до 9. Попробуй её отгадать!'
    );

    return bot.sendMessage(
        chatId, 
        'Выбирай цифру:', 
        gameOptions
    );   
};

const handleGameCallback = async (bot, chatId, data) => {
    if(data === '/again') {
        return startGame(bot, chatId);
    }

    const game = games[chatId];

    if (!game) {
        return bot.sendMessage(
            chatId,
            'У тебя сейчас нет активной игры. Запусти её командой /game'
        );
    }

    const userNumber = Number(data);

    game.attempts++;

    if (userNumber === game.randomNumber) {
        await bot.sendMessage(
            chatId,
            `🎉 Поздравляю! Ты отгадал цифру ${game.randomNumber}!\n` + 
            `Количество попыток: ${game.attempts}`,
            againOptions
        );

        delete games[chatId];

        return;
    }

    return bot.sendMessage(
        chatId,
        `❌ Не угадал!\n` +
        `Попытка №${game.attempts}\n` + 
        `Попробуй еще раз 👇`,
        gameOptions
    );
};

module.exports = {
    startGame,
    handleGameCallback,
};