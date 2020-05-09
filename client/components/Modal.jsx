import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState.jsx'

const Modal = () => {

    const {gameOver, winnerModal, closeModal, reStart} = useContext(GlobalContext);

    return (
        <div>
            {winnerModal ? <div id="myModal" className="modal">
                {/* <!-- Modal content --> */}
                <div className="modal-content">
                    <span className="close" onClick={()=>closeModal()}>&times;</span>
                    <p>⛏️Supper Minesweeper⛏️ <br/>💥Next Round?💥 </p>
                    <button onClick={()=>reStart()}>Let's Go!</button>
                </div>
            </div> : ''}
            {gameOver ? <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={()=>closeModal()}>&times;</span>
                    <p>⛏️Dear Minesweeper: Practice makes perfect⛏️ <br/>💥Next Round?💥 </p>
                    <button onClick={()=>reStart()}>Let's Go!</button>
                </div>
            </div> : ''}
        </div>

    );
}

export default Modal;