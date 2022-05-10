import React, {Fragment, useState, useEffect} from 'react';
import "./style.css";

import EditTodo from '../editTodo/editTodo';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    
    //Delete Todo
    const deleteTodo = (id) =>{
        try {
            const response = fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    //Get Todos
    const showAllTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json(); //parse into JSON to produce a JS Object
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect( () => {
        showAllTodos();
    }, []);


    return(
        <Fragment>
            <table className='listTodo'>
                <tbody>
                    { todos.map(todo => (
                        <tr className='element' key={todo.todo_id}>
                            <td className='tdCheck'>
                                <label className="checkBtn">
                                    <input type="checkbox" 
                                    className="myCheck" 
                                    />
                                    <span className='checkmark'></span>
                                </label>
                            </td>
                            <td className='tdDescription'>
                                {todo.description}
                            </td>
                            <td className='tdEdit'>
                                <EditTodo todo={todo}/>
                            </td>
                            <td className='tdDelete'>
                                <button 
                                className='btn btn-danger deletebtn'
                                onClick={() => deleteTodo(todo.todo_id)}>
                                X</button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo;