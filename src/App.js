import {useEffect, useState} from "react";
import Board from "./components/Board";
import "./style/myApp.css"

function App() {

    let [board, setBoard] = useState(new Array(9).fill(null)),
        [isGameOver, setIsGameOver] = useState(0),
        [curWinner, setCurWinner] = useState(null),
        [curMove, setCurMove] = useState(0);

    useEffect(() => {
        let variantsOfWin = ["XXX", "OOO"];
        if (variantsOfWin.includes(board[0] + board[1] + board[2])) {
            setIsGameOver(1);
            setCurWinner(board[0]);
        }

        if (variantsOfWin.includes(board[3] + board[4] + board[5])) {
            setIsGameOver(1);
            setCurWinner(board[3]);
        }

        if (variantsOfWin.includes(board[6] + board[7] + board[8])) {
            setIsGameOver(1);
            setCurWinner(board[6]);
        }

        if (variantsOfWin.includes(board[0] + board[3] + board[6])) {
            setIsGameOver(1);
            setCurWinner(board[0]);
        }

        if (variantsOfWin.includes(board[1] + board[4] + board[7])) {
            setIsGameOver(1);
            setCurWinner(board[4]);
        }

        if (variantsOfWin.includes(board[2] + board[5] + board[8])) {
            setIsGameOver(1);
            setCurWinner(board[2]);
        }

        if (variantsOfWin.includes(board[0] + board[4] + board[8])) {
            setIsGameOver(1);
            setCurWinner(board[0]);
        }

        if (variantsOfWin.includes(board[2] + board[4] + board[6])) {
            setIsGameOver(1);
            setCurWinner(board[2]);
        }

        if (board.every(el => el !== null) && !isGameOver) {
            setIsGameOver(1);
            setCurWinner(-1);
        }
    }, [board, isGameOver])

    const makeMove = (ind) => {
        if (board[ind] || isGameOver) return;
        setBoard(board.map((el, i) => i === ind ? (curMove % 2 ? "O" : "X") : el));
        setCurMove(curMove + 1);
    };

    const getCurrentWinner = () => {
        if (curWinner === -1) return "Draw";
        return `Player ${curWinner === "X" ? 1 : 2} won`;
    };

    const restartGame = () => {
        setBoard(new Array(9).fill(null));
        setCurWinner(null);
        setIsGameOver(0);
    };


    return (
        <div className="App">
            <h1>Tic-Tac-Toe Game</h1>

            <Board
                board={board}
                makeMove={makeMove}
                curMove={curMove}
            />

            {isGameOver ?
                (<div>
                    <div
                        className={`end-text ${curWinner === -1 ? "draw-text" : curWinner === 'X' ? "winner1-text" : "winner2-text"}`}>
                        {getCurrentWinner()}
                    </div>

                    <button onClick={restartGame} className="replay-button">
                        Replay
                    </button>

                </div>) : (
                    <div className="end-text">
                        Current move is for <strong>{curMove % 2 ? "O" : "X"}</strong>
                    </div>
                )
            }

        </div>
    );
}

export default App;
