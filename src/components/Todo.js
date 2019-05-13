import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class Todo extends React.Component{
    state = {
        todos : [],
        todoShow : "all"
    }

    addTodo = (todo) => {
        this.setState({
            todos : [todo, ...this.state.todos]
        });
    }

    handleToggle = (id) => {
        this.setState({
            todos : this.state.todos.map(todo => {
                if(todo.id === id){
                    return{
                        ...todo,
                        completed : !todo.completed
                    }
                }else{
                    return todo;
                }
            })
        });
    }

    toggleShow = (e) => {
        this.setState({
            todoShow : e.target.name
        });
    }

    render(){
        let todos = [];
        if(this.state.todoShow === 'all'){
            todos = this.state.todos;
        }else if(this.state.todoShow === 'active'){
            todos = this.state.todos.filter(todo => !todo.completed);
        }else if(this.state.todoShow === 'completed'){
            todos = this.state.todos.filter(todo => todo.completed);
        }

        return(
            <div>
                <TodoForm 
                onSub = {this.addTodo}
                />
                {todos.map(todo => 
                    <TodoList 
                    key = {todo.id}
                    todo = {todo}
                    toggleComplete = {() => this.handleToggle(todo.id)}
                    />
                )}
                <button name = "all" onClick = {this.toggleShow}>All</button>
                <button name = "active" onClick = {this.toggleShow}>Active</button>
                <button name = "completed" onClick = {this.toggleShow}>Completed</button>
            </div>
        );
    };
}