import React from 'react';
import "../style/myApp.css"


const Cell = (props) => {

    let {cell, makeMove, ind} = props;


    return (
        <button className="cell" onClick={() => makeMove(ind)}>
            {cell}
        </button>
    );
};

export default Cell;