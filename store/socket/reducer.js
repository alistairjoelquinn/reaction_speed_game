const initialState = {
    connected: 'Not yet connected',
    gameFull: false,
    playersCount: 0,
    id: null,
    userColor: null,
    welcomeMessage: '',
    takenColors: [],
    readyToPlay: false,
    playersGo: false,
    scores: {
        blue: 0,
        orange: 0,
        pink: 0,
        green: 0
    },
    winner: '',
    gameReset: false
};

export default (state = initialState, action) => {
    if (action.type === 'SOCKET_CONNECTED') {
        return {
            ...state,
            connected: 'SUCCESS!'
        };
    }
    if (action.type === 'GAME_FULL') {
        return {
            ...state,
            gameFull: true
        };
    }
    if (action.type === 'PLAYERS_COUNT') {
        return {
            ...state,
            playersCount: action.count
        };
    }
    if (action.type === 'PLAYER_ID_RECEIVED') {
        return {
            ...state,
            id: action.id
        };
    }
    if (action.type === 'PLAYER_COLOR_RECEIVED') {
        return {
            ...state,
            userColor: action.color
        };
    }
    if (action.type === 'WELCOME_MESSAGE_RECEIVED') {
        return {
            ...state,
            welcomeMessage: action.msg
        };
    }
    if (action.type === 'TAKEN_COLORS_RECEIVED') {
        return {
            ...state,
            takenColors: action.colors
        };
    }
    if (action.type === 'NEW_COLOR_CHOSEN') {
        return {
            ...state,
            takenColors: [
                ...state.takenColors,
                action.color
            ]
        };
    }
    if (action.type === 'READY_TO_PLAY') {
        return {
            ...state,
            readyToPlay: true
        };
    }
    if (action.type === 'NOT_READY_TO_PLAY') {
        return {
            ...state,
            userColor: null,
            readyToPlay: false,
            takenColors: [],
            welcomeMessage: '',
            gameReset: true,
            playersGo: false
        };
    }
    if (action.type === 'PLAYERS_GO') {
        return {
            ...state,
            playersGo: true
        };
    }
    if (action.type === 'BUTTON_RESET') {
        return {
            ...state,
            playersGo: false
        };
    }
    if (action.type === 'SCORE_UPDATE') {
        return {
            ...state,
            scores: action.score
        };
    }
    if (action.type === 'GAME_WINNER') {
        return {
            ...state,
            winner: action.winner
        };
    }
    if (action.type === 'WINNER_RESET') {
        return {
            ...state,
            winner: ''
        };
    }
    return state;
}