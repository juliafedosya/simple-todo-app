import React, {useState, useCallback} from "react";
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

// class TodoContainer extends React.Component {
//   state = {
//     todos: [
//       {
//         id: uuidv4(),
//         title: "Setup development environment",
//         completed: true,
//       },
//       {
//         id: uuidv4(),
//         title: "Develop website and add content",
//         completed: false,
//       },
//       {
//         id: uuidv4(),
//         title: "Deploy to live server",
//         completed: false,
//       },
//     ],
//   };

//   handleChange = (id) => {
//     this.setState({
//       todos: this.state.todos.map((todo) => {
//         if (todo.id === id) {
//           todo.completed = !todo.completed;
//         }
//         return todo;
//       }),
//     });
//   };

//   delTodo = (id) => {
//     this.setState({
//       todos: [
//         ...this.state.todos.filter((todo) => {
//           return todo.id !== id;
//         }),
//       ],
//     });
//   };

//   addTodoItem = (title) => {
//     const newTodo = {
//       // id: uuid.v4(),
//       id: uuidv4(),
//       title: title,
//       completed: false,
//     };
//     this.setState({
//       todos: [...this.state.todos, newTodo],
//     });
//   };

//   render() {
//     return (
//       <div className="container">
//         <Header />
//         <InputTodo addTodoProps={this.addTodoItem} />
//         <TodosList
//           todos={this.state.todos}
//           handleChangeProps={this.handleChange}
//           deleteTodoProps={this.delTodo}
//         />
//       </div>
//     );
//   }
// }

const TodoContainer = () => {
  const [todos, setTodos] = useState(INITIAL_TODOS);

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
      <TodosList
        todos={todos}
        handleChangeProps={handleChange}
        deleteTodoProps={deleteTodo}
      />
    </div>
  );
}
export default TodoContainer;
