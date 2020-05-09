import React, { useContext, useReducer } from 'react';
import { GlobalContext } from '../context/GlobalState.jsx'

const SquareEntry = ({ square, indRow, indCol }) => {
    const {updateStateBasedOnClick} = useContext(GlobalContext);

    const handleClick = (indRow, indCol) => {
        updateStateBasedOnClick(indRow, indCol);
    };

    return (
        <div className="square"  onClick={() => {handleClick(indRow, indCol)}}><p className='symbol'>{square}</p></div>
    )
}

export default SquareEntry;