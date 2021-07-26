import React from 'react';

const Tag = (props) => {
    const {tagId, name, color, itemId } = props;

    return (
        <div key={`${itemId}-${tagId}`} style={{height:20, backgroundColor: color}}>
            <span>{name}</span>
        </div>
    )
}

export default Tag;