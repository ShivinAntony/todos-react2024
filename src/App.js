import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  // Function to update a todo
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Function to toggle a todo's completion status
  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter pending tasks
  const pendingTasks = todos.filter(todo => !todo.completed);

  // Filter completed tasks
  const completedTasks = todos.filter(todo => todo.completed);

  // Handle login
  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <h1>Todo App</h1>
          <div className="add-todo">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter todo..."
            />
            <button onClick={addTodo}>Add Todo</button>
          </div>

          {/* Summary */}
          <p className={`summary ${completedTasks.length === todos.length ? 'completed-summary' : 'pending-summary'}`}>
            {completedTasks.length} / {todos.length} todos completed
          </p>

          {/* Pending Tasks */}
          <div>
            <h2>Pending Tasks</h2>
            <ul className="todo-list">
              {pendingTasks.map(todo => (
                <li key={todo.id} className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.completed ? 'completed-todo' : ''}>{todo.text}</span>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => updateTodo(todo.id, prompt('Enter new text'))}>
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed Tasks */}
          <div>
            <h2>Completed Tasks</h2>
            <ul className="todo-list">
              {completedTasks.map(todo => (
                <li key={todo.id} className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={`completed-todo ${todo.completed ? 'completed-todo' : ''}`}>{todo.text}</span>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="login-container">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
