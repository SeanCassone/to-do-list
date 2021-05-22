const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // => allows to access req.body

// Routes

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(err.message);
  }
});
//get a todo
app.get("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const foundTodo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [todoId]
    );
    res.json(foundTodo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});
//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, todoId]
    );
    res.json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      todoId,
    ]);
    res.json("Todo was deleted");
  } catch (error) {}
});

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
