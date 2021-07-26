import React, { useState } from "react";
import Tag from "./Tag";
import TagModal from "./TagModal";

const TodoItem = (props) => {

  const [showModal, setShowModal] = useState(false);

  const { completed, id, title, tags } = props.todo;

  const commonTags = props.tags;

  return (
    <>
    <li className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => props.handleChangeProps(id)}
      />
      <button onClick={() => props.deleteTodoProps(id)}>Delete</button>
      <button onClick={() => setShowModal(true)}>Add Tag</button>
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
    </li>
    {
      showModal && (
        <TagModal 
          commonTags={commonTags}
          itemTags={tags}
          itemId={id}
          removeTag={props.removeTag} 
          addTag={props.addTag} 
          closeModal={() => setShowModal(false)}
        />)
    }
    </>
  );
}

export default TodoItem;
