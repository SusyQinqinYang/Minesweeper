import React, { useState, useContext,  } from 'react';
import ReactDOM from 'react-dom';
//don't use useContext in App, otherwise it won't render when state gets updated.
import { GlobalProvider } from './context/GlobalState.jsx'
import Board from './components/Board.jsx'
import Modal from './components/Modal.jsx'
import Restart from './components/Restart.jsx'

const App = (props) => {
    // const { initBoard, mineBoard } = useContext(GlobalContext);

    return (
        <GlobalProvider>
            <div className="App">
                <header>Minesweeper</header>
                <Restart />
                <Board />
                <Modal />
            </div>
        </GlobalProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));