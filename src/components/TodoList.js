import React from 'react';

export default props => (
    <div style = {{
        display : "flex", justifyContent : "center"
    }}>
    <div style = {{
        textDecoration : props.todo.completed ? "line-through" : null,
        cursor : "pointer"
    }} onClick = {props.toggleComplete}>{props.todo.text}</div>
    <button onClick = {props.delete}>X</button>
    </div>
)