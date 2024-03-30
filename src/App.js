import {useEffect, useState} from "react";
import Board from "./components/Board";
import "./style/myApp.css"

function App() {

    let [board, setBoard] = useState(new Array(9).fill(null)),
        [isGameOver, setIsGameOver] = useState(0),
        [curWinner, setCurWinner] = useState(null),
        [curMove, setCurMove] = useState(0);


    const getWinner = () => {
        let variantsOfWin = ["XXX", "OOO"],
            winnerCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

        for (let el of winnerCombinations) {
            if (variantsOfWin.includes(board[el[0]] + board[el[1]] + board[el[2]])) {
                setCurWinner(board[el[0]]);
                setIsGameOver(1);
                return;
            }
        }

        if (board.every(el => el !== null) && !isGameOver) {
            setCurWinner(-1);
            setIsGameOver(1);
        }
    }

    useEffect(() => {
        getWinner();
    }, [board, getWinner])

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
        setCurMove(0);
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
