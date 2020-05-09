import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer.jsx';

//emojis https://emojis.wiki/collision/#combos
//https://getemoji.com/
//init state
let initialState = {
    initBoard: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
    ],
    mineBoard: [
        [1, '💣', 1, '', '', '', '', '', '', ''],
        [1, 1, 1, '', '', 1, '💣', 1, '', ''],
        ['', 1, 1, 2, '💣', 2, 1, 1, '', ''],
        ['', 1, '💣', 2, 1, '', '', '', '', 1],
        ['', 1, 1, '', 1, 1, 1, '', 1, '💣'],
        ['', '', '', '', 1, '💣', 2, '', 1, 1],
        ['', '', '', '', '', 3, '💣', 1, '', ''],
        ['', '', '', '', 2, '💣', 2, '', '', ''],
        [1, 1, '', 1, '💣', 2, 1, '', '', ''],
        ['💣', 1, '', '', 1, '', '', '', '', '']
    ],
    emojis: ["😀", "💣", "💥", '⛏️'],
    gameOver: false,
    winnerModal: false
};

//create context
export const GlobalContext = createContext(initialState);

//provide to component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    function updateStateBasedOnClick(indRow, indCol) {
        if (state.mineBoard[indRow][indCol] === "💣") {
            dispatch({
                type: 'BOOM_CLICKED',
            })
        };
        if (typeof state.mineBoard[indRow][indCol] === 'number') {
            dispatch({
                type: 'NUMBER_CLICKED',
                updatedInitBoardNum: replaceOneNumEle(indRow, indCol)
            })
        };
        if (state.mineBoard[indRow][indCol].length === 0) {
            dispatch({
                type: 'BLANK_CLICKED',
                updatedInitBoardBlank: replaceBlank(indRow, indCol)
            })
        }
    };

    function switchWinModal() {
        dispatch({
            type: 'WIN_MODAL_SWITCH',
        })
    }

    function closeModal() {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    }

    function reStart() {
        console.log('state.gameOver in restart', state.gameOver);
        // console.log('restart init board in restart', state.initBoard)
        console.log('restart mine board in restart', state.mineBoard)
        dispatch({
            type: 'RESTART_GAME',
            newMineBoard: initNewMineBoard(),
        })
    }

    // helper function for action
    const replaceOneNumEle = (indRow, indCol) => {
        for (var row = 0; row < state.initBoard.length; row++) {
            for (var col = 0; col < state.initBoard[row].length; col++) {
                if (row === indRow && col === indCol) {
                    state.initBoard[row].splice(col, 1, state.mineBoard[indRow][indCol]);
                    return state.initBoard;
                }
            }
        }
    }

    const replaceBlank = (indRow, indCol) => {
        render(indRow, indCol);
        return state.initBoard;
    }

    const initNewMineBoard = () => {
        let newMineBoard = new Array(10).fill('').map(ele => (new Array(10).fill('')));
        for (var r = 0; r < newMineBoard.length; r++) {
            let randomColInd = Math.floor(Math.random() * 10);
            newMineBoard[r].splice(randomColInd, 1, "💣");
        };

        for (var r1 = 0; r1 < newMineBoard.length; r1++) {
            for (var c1 = 0; c1 < newMineBoard[r1].length; c1++) {
                if (newMineBoard[r1][c1] !== "💣") {
                    let sum = 0;
                    if (r1 > 0 && newMineBoard[r1 - 1][c1] === "💣") sum++;
                    if (r1 < newMineBoard.length - 1 && newMineBoard[r1 + 1][c1] === "💣") sum++;
                    if (c1 > 0 && newMineBoard[r1][c1 - 1] === "💣") sum++;
                    if (c1 < newMineBoard[r1].length - 1 && newMineBoard[r1][c1 + 1] === "💣") sum++;
                    if (r1 > 0 && c1 > 0 && newMineBoard[r1 - 1][c1 - 1] === "💣") sum++;
                    if (r1 < newMineBoard.length - 1 && c1 < newMineBoard[r1].length - 1 && newMineBoard[r1 + 1][c1 + 1] === "💣") sum++;
                    if (r1 > 0 && c1 < newMineBoard[r1].length - 1 && newMineBoard[r1 - 1][c1 + 1] === "💣") sum++;
                    if (r1 < newMineBoard.length - 1 && c1 > 0 && newMineBoard[r1 + 1][c1 - 1] === "💣") sum++;

                    newMineBoard[r1].splice(c1, 1, sum);
                }
            }
        }
        return newMineBoard;
    }

    function render(row, col) {
        if (row < 0 || row > 9 || col < 0 || col > 9 || state.initBoard[row][col] === '⛏️' || state.mineBoard[row][col] === '💣') {
            return;
        }
        if (typeof state.mineBoard[row][col] === 'number') {
            state.initBoard[row].splice(col, 1, state.mineBoard[row][col]);
            return;
        }
        state.initBoard[row].splice(col, 1, '⛏️');
        render(row, col + 1)
        render(row, col - 1)
        render(row + 1, col)
        render(row - 1, col)
    }

    return (
        <GlobalContext.Provider value={{
            initBoard: state.initBoard,
            mineBoard: state.mineBoard,
            emojis: state.emojis,
            gameOver: state.gameOver,
            winnerModal: state.winnerModal,
            updateStateBasedOnClick,
            switchWinModal,
            closeModal,
            reStart
        }}>
            {children}
        </GlobalContext.Provider>
    );
}