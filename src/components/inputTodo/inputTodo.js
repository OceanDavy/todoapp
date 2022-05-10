import React, {Fragment, useState} from 'react';
import "./style.css";

const InputTodo = ({sendTodo}) => {
    const [description, setDescription] = useState("");

    //Submit Form - Create New-Todo Function
    const createTodo = async (e) => {
        e.preventDefault();
        if(description !== ""){
            try {
                const body = { description };
                const response =  await fetch('http://localhost:5000/todos', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                window.location = "/";
                
            } catch (error) {
                console.log(error.message);
            }
        } else{
            alert("Nothing to add!");
        }
    }

    return(
        <Fragment>
            <form className='container' onSubmit={createTodo}>
                <input 
                    type="text" 
                    className="form-control inputTodo" 
                    placeholder="Write a new todo..."
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                <button 
                    type="submit" 
                    className='btn btn-primary btnSubmit'>
                Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;