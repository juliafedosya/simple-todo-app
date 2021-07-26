import React, { useState, useCallback, useMemo, useEffect } from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";


const INITIAL_TODOS = [
  {
    id: uuidv4(),
    title: "Setup development environment",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "Develop website and add content",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Deploy to live server",
    completed: false,
  },
];

function getInitialTodos() {
  if(localStorage.getItem('todos') === null) {
    console.log('todos are not in the local storage');
    return INITIAL_TODOS;
  }

   console.log('todos', localStorage.getItem('todos'));

  return JSON.parse(localStorage.getItem('todos'));
}


const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);

  useEffect(() => {
    console.log('todos when useEffect is called', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const todosToDisplay = useMemo(() => {
    if(showOnlyCompleted) {
      return todos.filter(t => t.completed);
    }
    return todos;
  },[showOnlyCompleted, todos]);

  const handleChange = useCallback((id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }));
  }, [todos, setTodos]);

  const deleteTodo = useCallback((id) => {
    setTodos([
      ...todos.filter((todo) => {
        return todo.id !== id;
      })
    ]);
  }, [todos, setTodos]);
  
  const addTodoItem = useCallback((title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }, [todos, setTodos]);

  return (
    <div className="container">
      <Header />
      <InputTodo addTodoProps={addTodoItem} />
      <p>
        <label> Show only completed </label>
        {' '}
        <input type='checkbox' value={showOnlyCompleted} onChange={(e) => setShowOnlyCompleted(e.target.checked)}></input>
      </p>
      <TodosList
        todos={todosToDisplay}
        handleChangeProps={handleChange}
        deleteTodoProps={deleteTodo}
      />
    </div>
  );
}
export default TodoContainer;
