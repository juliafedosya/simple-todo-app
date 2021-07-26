import React from "react";

const Assignee = (props) => {
  const { id, name, assignedUserId } = props;

  return (
    <li
      key={id}
      style={{
        cursor: "pointer",
        color: assignedUserId === id ? "green" : "black",
      }}
      onClick={() => props.assignUser(id)}
    >
      {name}
    </li>
  );
};

export default Assignee;
