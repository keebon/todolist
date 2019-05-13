import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class Todo extends React.Component{
    state = {
        todos : [],
        todoShow : "all",
        toggleAllComplete : true
    }

    addTodo = (todo) => {
        this.setState(state => ({
            todos : [todo, ...state.todos]
        }));
    }

    handleToggle = (id) => {
        this.setState(state => ({
            todos : state.todos.map(todo => {
                if(todo.id === id){
                    return{
                        ...todo,
                        completed : !todo.completed
                    }
                }else{
                    return todo;
                }
            })
        }));
    }

    toggleShow = (e) => {
        this.setState({
            todoShow : e.target.name
        });
    }

    handleDelete = (id) => {
        this.setState(state => ({
            todos : state.todos.filter(todo => todo.id !== id)
        }));
    }

    removeTodosThatAreComplete = () => {
        this.setState(state => ({
            todos : state.todos.filter(todo => !todo.completed)
        }));
    }

    handleToggleAllComplete = () => {
        this.setState(state => ({
            todos : state.todos.map(todo => ({
                ...todo,
                completed : state.toggleAllComplete
            })),
            toggleAllComplete : !state.toggleAllComplete
        }));
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
                    delete = {() => this.handleDelete(todo.id)}
                    />
                )}
                <div>Todos Left : {this.state.todos.filter(todo => !todo.completed).length}</div>
                <button name = "all" onClick = {this.toggleShow}>All</button>
                <button name = "active" onClick = {this.toggleShow}>Active</button>
                <button name = "completed" onClick = {this.toggleShow}>Completed</button>
                {this.state.todos.some(todo => todo.completed) ? 
                (
                    <div>
                        <button onClick = {this.removeTodosThatAreComplete}>Remove All Completed</button>
                    </div>
                ) : null }
                <div>
                    <button onClick = {this.handleToggleAllComplete}>Toggle All Complete : {`${this.state.toggleAllComplete}`}</button>
                </div>
            </div>
        );
    };
}