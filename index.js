const express = require('express');
const app = express();
const compression = require('compression');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "reaction-speed-game.herokuapp.com",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    }
});
const { selectedColorsCalculate } = require('./utils/selectedColorsCalculate');

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
    app.use(
        '/output.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/output.js', (req, res) => {
        res.sendFile(`${__dirname}/output.js`);
    });
}

app.get('*', (req, res) => res.sendFile(__dirname + '/init/index.html'));

server.listen(process.env.PORT || 8080, () => console.log("Server Listening"));

const currentUsers = {};
let colorScores = {
    blue: 0,
    orange: 0,
    pink: 0,
    green: 0
};
let waiting = false;
let winner;
let clickWait = false;

io.on('connection', (socket) => {
    if (Object.keys(currentUsers).length >= 4) {
        io.to(socket.id).emit("game_full", true);
        return;
    } else {
        currentUsers[socket.id] = null;
        io.to(socket.id).emit("playerId", socket.id);
        io.emit('playersCount', Object.values(currentUsers).length);
    };

    socket.on('startGame', id => {
        io.to(socket.id).emit("welcomeMessage", `
            You are player number ${Object.keys(currentUsers).length}!
            ${selectedColorsCalculate(currentUsers)}
        `);
        io.to(id).emit("takenColors", Object.values(currentUsers).filter(Boolean));
    })

    socket.on('colorSelected', ({ userId, userColor }) => {
        currentUsers[userId] = userColor;
        io.to(socket.id).emit("playerColor", userColor);
        io.emit('newColorChosen', userColor);
        if (Object.values(currentUsers).filter(Boolean).length === 4) {
            io.emit('readyToPlay');
            gameInitiate();
        }
    });

    socket.on('playerPress', (userId) => {
        if (clickWait === true) {
            return;
        }
        if (waiting === true) {
            updateScore(userId);
            clickWait = true;
            setTimeout(() => clickWait = false, 1000);
        } else {
            reduceScore(userId);
            return;
        }

        winner = winnerCheck();
        if (winner) {
            io.emit('winner', winner);
        } else {
            waiting = false;
            io.emit('buttonReset');
            play();
        }
    });

    socket.on('disconnect', () => {
        delete currentUsers[socket.id];
        for (const prop in currentUsers) {
            currentUsers[prop] = null;
        }
        colorScores = {
            blue: 0,
            orange: 0,
            pink: 0,
            green: 0
        };
        waiting = false;
        winner = '';
        io.emit('scoreUpdate', colorScores);
        io.emit('buttonReset');
        io.emit('winnerReset');
        io.emit('playersCount', Object.values(currentUsers).length);
        io.emit('notReadyToPlay');
        play(true);
    });

    const gameInitiate = () => setTimeout(play, 8000);
    const randomTimeCounter = () => Math.floor(Math.random() * 20000);

    const play = (cancel) => {
        if (cancel) {
            return;
        }
        setTimeout(() => {
            io.emit('playersGo');
            waiting = true;
        }, randomTimeCounter());
    };

    const updateScore = (userId) => {
        colorScores[currentUsers[userId]]++;
        io.emit('scoreUpdate', colorScores);
    };

    const reduceScore = (userId) => {
        colorScores[currentUsers[userId]]--;
        io.emit('scoreUpdate', colorScores);
    };

    const winnerCheck = () => {
        for (const prop in colorScores) {
            if (colorScores[prop] >= 5) {
                return prop;
            }
        }
        return null;
    };

    socket.on('playAgain', () => {
        colorScores = {
            blue: 0,
            orange: 0,
            pink: 0,
            green: 0
        };
        waiting = false;
        winner = '';
        io.emit('scoreUpdate', colorScores);
        io.emit('buttonReset');
        io.emit('winnerReset');
        play();
    })
});