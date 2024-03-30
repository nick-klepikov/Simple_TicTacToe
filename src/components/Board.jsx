import React from 'react';
import Cell from "./Cell";
import "../style/myApp.css"


const Board = (props) => {

    let {board, makeMove, curMove} = props;


    return (
        <div className="board">

            {board.map(((cell, i) => <Cell
                cell={cell}
                makeMove={makeMove}
                curMove={curMove}
                ind={i}
            />))}

        </div>
    );
};

export default Board;