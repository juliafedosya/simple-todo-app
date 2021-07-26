import React from "react";

const Tag = (props) => {
  const { tagId, name, color, itemId } = props;

  return (
    <>
      <div
        //unique key is required, so a pair of tag id and parental item id is a unique combination
        key={`${itemId}-${tagId}`}
        style={{ height: 20, backgroundColor: color }}
      >
        <span>{name}</span>
      </div>
    </>
  );
};

export default Tag;