import React from "react";
import TodoItem from "./TodoItem";

const TodosList = (props) => {
  return (
    <div>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeProps={props.handleChangeProps}
          deleteTodoProps={props.deleteTodoProps}
          tags={props.tags}
          addTag={props.addTag}
          removeTag={props.removeTag}
        />
      ))}
    </div>
  );
}

export default TodosList;
