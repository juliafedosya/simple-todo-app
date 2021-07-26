import React, { useState, useCallback } from "react";
import { AssigneeModal } from "./AssigneeModal";
import Tag from "./Tag";
import TagModal from "./TagModal";

const TodoItem = (props) => {

  const [showTagModal, setShowTagModal] = useState(false);
  const [showAssigneeModal, setShowAssigneeModal] = useState(false)

  const {
    todo: { completed, id, title, tags, assignedUserId },
    tags: commonTags,
    addTag,
    removeTag,
    users,
    assignUserToTodo
  } = props;

  const assignUser = useCallback((userId) => {
    assignUserToTodo(id, userId)
  }, [id, assignUserToTodo])

  const assignedToText = users.find(u => u.id === assignedUserId).name;

  return (
    <>
    <li className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => props.handleChangeProps(id)}
      />
      <button onClick={() => props.deleteTodoProps(id)}>Delete</button>
      <button onClick={() => setShowTagModal(true)}>Add Tag</button>
      <button onClick={() => setShowAssigneeModal(true)}>Assign user</button>
      <span className={completed ? 'completed' : ''}>{title}</span>
      <div style={{ display : 'flex' }}>
        {
          tags.map(t => {
            const tagData = commonTags.find(tag => tag.id === t);
            return (
              <Tag 
                key={`key-${id}-${t}`}
                itemId={id}
                tagId={t}
                color={tagData.color}
                name={tagData.name}/>
            )
          })
        }
      </div>
      <div>{`Assignee : ${assignedToText}`}</div>
    </li>
    {
      showTagModal && (
        <TagModal 
          commonTags={commonTags}
          itemTags={tags}
          itemId={id}
          removeTag={removeTag} 
          addTag={addTag} 
          closeModal={() => setShowTagModal(false)}
        />)
    }
    {
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
}

export default TodoItem;
