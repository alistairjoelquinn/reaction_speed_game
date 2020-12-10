import * as io from 'socket.io-client';

import {
    gameFull, newColorChosen, socketConnected, storePlayerColor,
    storePlayerId, storeTakenColors, storeWelcomeMessage
} from '../store/socket/actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        store.dispatch(socketConnected());
        socket.on('game_full', () => store.dispatch(gameFull()));
        socket.on('playerId', id => store.dispatch(storePlayerId(id)));
        socket.on('playerColor', color => store.dispatch(storePlayerColor(color)));
        socket.on('welcomeMessage', msg => store.dispatch(storeWelcomeMessage(msg)));
        socket.on('takenColors', colors => store.dispatch(storeTakenColors(colors)));
        socket.on('newColorChosen', color => store.dispatch(newColorChosen(color)));
    }
};