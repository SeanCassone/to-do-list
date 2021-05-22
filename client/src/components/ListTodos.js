import { useEffect, useState } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function
  async function deleteTodos(todoId) {
    try {
      await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== todoId));
    } catch (err) {
      console.error(err.message);
    }
  }
  // get todo function
  async function getTodos() {
    const res = await fetch("http://localhost:5000/todos");
    const todoArray = await res.json();
    setTodos(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <>
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodos(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ListTodos;
