import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState.jsx'
import SquareEntry from './SquareEntry.jsx';

const Board = () => {
    const { initBoard, switchWinModal } = useContext(GlobalContext);

    useEffect(() => {
        if (initBoard.flat(Infinity).join('').length === 142) {
            switchWinModal();
        }
    })

    return (
        <div className='board'>
            {initBoard.map((row, indRow) => {
                return row.map((col, indCol) => {
                    return (
                        <SquareEntry key={`${indRow} : ${indCol}`} square={col} indRow={indRow} indCol={indCol} />
                    );
                })
            })}
        </div>
    )
}

export default Board;