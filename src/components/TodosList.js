import React from "react";
import TodoItem from "./TodoItem";

const TodosList = (props) => {
  const {
    todos,
    tags,
    users,
    addTag,
    handleChangeProps,
    deleteTodoProps,
    removeTag,
    assignUserToTodo,
  } = props;

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          users={users}
          tags={tags}
          handleChangeProps={handleChangeProps}
          deleteTodoProps={deleteTodoProps}
          addTag={addTag}
          removeTag={removeTag}
          assignUserToTodo={assignUserToTodo}
        />
      ))}
    </div>
  );
};

export default TodosList;
