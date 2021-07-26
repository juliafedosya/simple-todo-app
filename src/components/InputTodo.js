import React, { useState, useCallback } from "react";

const InputTodo = (props) => {
  const [title, setTitle] = useState("");

  const onChange = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      props.addTodoProps(title);
      setTitle("");
    },
    [setTitle, title, props]
  );

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={title}
        name="title"
        onChange={onChange}
      />
      <input type="submit" className="input-submit" value="Submit" />
    </form>
  );
};
export default InputTodo;
