import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";




function Todo() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");


  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/todos", {
        title,
        due_date: dueDate
      });
      setTodos([...todos, response.data]);
      setTitle("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <br />
        <label>Due Date:</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <br />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} (Due: {todo.due_date || "No Date"}) - {todo.complete ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
