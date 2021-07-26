import React from "react";
import TodoItem from "./TodoItem";

const TodosList = (props) => {

  return (
    <div>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          users={props.users}
          tags={props.tags}
          handleChangeProps={props.handleChangeProps}
          deleteTodoProps={props.deleteTodoProps}
          addTag={props.addTag}
          removeTag={props.removeTag}
          assignUserToTodo={props.assignUserToTodo}
        />
      ))}
    </div>
  );
}

export default TodosList;
