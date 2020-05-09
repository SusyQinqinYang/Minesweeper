import React, { useState, useContext,  } from 'react';
import ReactDOM from 'react-dom';
import { GlobalProvider, GlobalContext } from './context/GlobalState.jsx'
// import SquareEntry from './components/SquareEntry.jsx';
import Board from './components/Board.jsx'
import Modal from './components/Modal.jsx'


const App = (props) => {
    // const { initBoard, mineBoard } = useContext(GlobalContext);

    return (
        <GlobalProvider>
            <div className="App">
                <h1>Minesweeper</h1>
                <Board />
                <Modal/>
            </div>
        </GlobalProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));