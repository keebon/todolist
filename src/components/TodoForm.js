import React from 'react';
import shortid from 'shortid';

export default class TodoForm extends React.Component{
    state = {
        text : ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state.text);
    }

    onSub = (e) => {
        e.preventDefault();
        this.props.onSub({
            id : shortid.generate(),
            text : this.state.text,
            completed : false
        });
        this.setState({
            text : ""
        });
    };

    render(){
        return(
            <div>
                <form onSubmit = {this.onSub}>
                    <input 
                    name = "text"
                    onChange = {this.onChange}
                    value = {this.state.text}
                    placeholder = "todo..." />
                    <button onClick = {this.onSub}> Add Todo </button>
                </form>
            </div>
        );
    };  
}