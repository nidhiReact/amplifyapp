/* src/App.js */
import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { withAuthenticator } from "aws-amplify-react";
import './App.css'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: "", description: "" };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
      

    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  async function deleteNote(id) {
    const newNotesArray = todos.filter((note) => note.id !== id);
    setTodos(newNotesArray);
    await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
  }
  async function updateNote(id) {
    const newNotesArray = todos.map((todo) => {
      todo.date = todo.id === id ? true : false;
    });
    setTodos(newNotesArray);
    await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
  }
  return (
    <div>
      <div style={styles.container}>
        <h2>Amplify Todos</h2>
        <input
          onChange={(event) => setInput("name", event.target.value)}
          style={styles.input}
          value={formState.name}
          placeholder="Task Name"
        />
        <input
          onChange={(event) => setInput("description", event.target.value)}
          style={styles.input}
          value={formState.description}
          placeholder="Description"
        />
        <button style={styles.button} onClick={addTodo}>
          Create Todo
        </button>


        <table id="customers">
  <tr>
    <th>Task</th>
    <th>Description</th>
    <th>Action</th>
  </tr>
 
        {todos.map((todo, index) => (
          <tr>
          <td>{todo.name}</td>
            <td>{todo.description}</td>
            <td>
    
              <button style={{margin: "10px 18px"}}  onClick={() => deleteNote(todo.id)}>
                Delete
              </button>
             
            </td>
          </tr>
          
        
        
        ))}

</table>

     
     
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 600,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15, border: "1px solid black", borderRadius: "10px" },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
    marginBottom: "5%",
  },
};

// export default App
export default withAuthenticator(App, true);
