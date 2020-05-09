import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState.jsx'

const Restart = () => {
    const { reStart } = useContext(GlobalContext);

    return (
        <div className='restart'>
            <button className='btn restart' onClick={() => { reStart() }}>Restart</button>
        </div>
    )
};

export default Restart;