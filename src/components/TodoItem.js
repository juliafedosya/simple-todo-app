import React, { useState, useCallback } from "react";
import { AssigneeModal } from "./AssigneeModal";
import Tag from "./Tag";
import TagModal from "./TagModal";

const TodoItem = (props) => {
  const [showTagModal, setShowTagModal] = useState(false);
  const [showAssigneeModal, setShowAssigneeModal] = useState(false);

  const {
    todo: { completed, id, title, tags, assignedUserId },
    tags: commonTags,
    addTag,
    removeTag,
    users,
    deleteTodoProps,
    assignUserToTodo,
  } = props;

  const assignUser = useCallback(
    (userId) => {
      assignUserToTodo(id, userId);
    },
    [id, assignUserToTodo]
  );

  // resolve assignee text based on the assignedUserId
  const assignedToText = users.find((u) => u.id === assignedUserId).name;

  return (
    <>
      <li className="todo-item">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
        />
        <button onClick={() => deleteTodoProps(id)}>Delete</button>
        <button onClick={() => setShowTagModal(true)}>Add Tag</button>
        <button onClick={() => setShowAssigneeModal(true)}>Assign user</button>
        <span className={completed ? "completed" : ""}>{title}</span>
        <div style={{ display: "flex" }}>
          {tags.map((t) => {
            // looking for the todo's tag in global tag list
            const tagData = commonTags.find((tag) => tag.id === t);

            return (
              <Tag
                key={`key-${id}-${t}`}
                itemId={id}
                tagId={t}
                color={tagData.color}
                name={tagData.name}
              />
            );
          })}
        </div>
        <div>{`Assignee : ${assignedToText}`}</div>
      </li>
      {
        //only show element when button Add Tag was clicked
        showTagModal && (
          <TagModal
            commonTags={commonTags}
            itemTags={tags}
            itemId={id}
            removeTag={removeTag}
            addTag={addTag}
            closeModal={() => setShowTagModal(false)}
          />
        )
      }
      {
        //only show element when button Assign User was clicked
        showAssigneeModal && (
          <AssigneeModal
            closeModal={() => setShowAssigneeModal(false)}
            users={users}
            assignedUserId={assignedUserId}
            assignUser={assignUser}
          />
        )
      }
    </>
  );
};

export default TodoItem;
