import React, {Fragment, useState} from 'react';
import "./style.css";

const EditTodo = ({todo}) => {
    console.log(todo);
    const [description, setDescription] = useState(todo.description);

    //Edit function
    const changeDescription = async(e) =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primary editBtn" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
            </button>

            <div className="modal" id={`id${todo.todo_id}`}
            onClick={() => setDescription(todo.description)}
            >
              <div className="modal-dialog">
                <div className="modal-content">


                  <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button type="button" className="close" data-dismiss="modal"
                    onClick={() => setDescription(todo.description)}
                    >&times;</button>
                  </div>


                  <div className="modal-body">
                    <input type="text" className='form-control' 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}></input>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" 
                    onClick={ e =>  changeDescription(e) }>Change</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal"
                    onClick={() => setDescription(todo.description)}
                    >Cancel</button>
                  </div>

                </div>
              </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;