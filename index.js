const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES
// create a todo
app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description]);
        
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});
// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const aTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(aTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {description} = req.body;
        const {id} = req.params;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json(`Todo Updated to: ${description}`);
    } catch (error) {
        console.log(error.message);
    }
});
// delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json(`To-Do with ID: ${id} was deleted`);
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log("Server listening on: 5000");
});


