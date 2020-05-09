export default (state, action) => {
    switch (action.type) {
        case 'NUMBER_CLICKED':
            return {
                ...state,
                initBoard: action.updatedInitBoardNum
            }
        case 'BOOM_CLICKED':
            return {
                ...state,
                initBoard: state.mineBoard,
                gameOver: true
            }
        case 'BLANK_CLICKED':
            return {
                ...state,
                initBoard: action.updatedInitBoardBlank
            }
        case 'WIN_MODAL_SWITCH':
            return {
                ...state,
                winnerModal: true,
                initBoard: state.mineBoard
            }
        case 'RESTART_GAME':
            return {
                ...state,
                winnerModal: false,
                gameOver: false,
                initBoard: new Array(10).fill('').map((ele)=> (new Array(10).fill(''))),
                mineBoard: action.newMineBoard
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                winnerModal: false,
                gameOver: false,
            }
        default:
            return state;
    }
}


//use map to update initBoard
// initBoard: state.initBoard.map((row, rowI) => {
//     return (
//         row.map((col, colI) => {
//             if (rowI === action.indRow && colI === action.indCol) {
//                 return state.mineBoard[action.indRow][action.indCol];
//             } else {
//                 return col;
//             }
//         })
//     )
// })