import React, { useState, useCallback, useMemo, useEffect } from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";

const INITIAL_TAGS = [
  {
    id: uuidv4(),
    name: 'work',
    color : '#f00'
  },
  {
    id: uuidv4(),
    name: 'home',
    color : '#ff0'
  },
  {
    id: uuidv4(),
    name: 'urgent',
    color : '#f0f'
  },
  {
    id: uuidv4(),
    name: 'morning',
    color : '#0f0'
  },
  {
    id: uuidv4(),
    name: 'weekend',
    color : '#00f'
  }
];

const UNASSIGNED_USER = {
  id: uuidv4(),
  name: 'Unassigned'
};

const INITIAL_USERS = [
  {
    id: uuidv4(),
    name: 'Yuliia'
  },
  {
    id: uuidv4(),
    name: 'John',
  },
  {
    id: uuidv4(),
    name: 'Thomas'
  },
  {
    id: uuidv4(),
    name: 'Mark'
  },
  UNASSIGNED_USER
];

const INITIAL_TODOS = [
  {
    id: uuidv4(),
    title: "Setup development environment",
    completed: true,
    tags : [],
    assignedUserId : UNASSIGNED_USER.id
  },
  {
    id: uuidv4(),
    title: "Develop website and add content",
    completed: false,
    tags : [],
    assignedUserId : UNASSIGNED_USER.id
  },
  {
    id: uuidv4(),
    title: "Deploy to live server",
    completed: false,
    tags : [],
    assignedUserId : UNASSIGNED_USER.id
  },
];
function getInitialTodos() {
  if(localStorage.getItem('todos') === null) {
    return INITIAL_TODOS;
  }

  return JSON.parse(localStorage.getItem('todos'));
}

function getInitialTags() {
  if(localStorage.getItem('tags') === null) {
    return INITIAL_TAGS;
  }

  return JSON.parse(localStorage.getItem('tags'));
}

function getInitialUsers() {
  if(localStorage.getItem('users') === null) {
    return INITIAL_USERS;
  }

  return JSON.parse(localStorage.getItem('users'));
}

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());
  const [users, setUsers] = useState(getInitialUsers());
  const [tags, setTags] = useState(getInitialTags());
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

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
      tags: [],
      assignedUserId : UNASSIGNED_USER.id
    };
    setTodos([...todos, newTodo]);
  }, [todos, setTodos]);

  const addTag = useCallback((todoId, tagId) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === todoId) {
        return {
          ...todo,
          tags : [...todo.tags, tagId]
        }
      }
      return todo;
    });
    setTodos(newTodos);
  }, [setTodos, todos]);

  const removeTag = useCallback((todoId, tagId) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === todoId && todo.tags.includes(tagId)) {
        return {
          ...todo,
          tags : todo.tags.filter(t => tagId !== t)
        };
      }
      return todo;
    });
    setTodos(newTodos);
  }, [setTodos, todos]);

  const assignUserToTodo = useCallback((todoId, userId) => {
    const newTodos = todos.map(t => {
      if (t.id === todoId) {
        return {
          ...t,
          assignedUserId: userId
        }
      }

      return t
    })

    setTodos(newTodos)
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
        tags={tags}
        users={users}
        handleChangeProps={handleChange}
        deleteTodoProps={deleteTodo}
        addTag={addTag}
        removeTag={removeTag}
        assignUserToTodo={assignUserToTodo}
      />
    </div>
  );
}
export default TodoContainer;
