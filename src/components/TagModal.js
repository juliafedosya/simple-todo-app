import React from 'react';
import Modal from './Modal';

const TagModal = (props) => {

    const { commonTags, itemTags, itemId } = props;

    const onChange = (tagId) => {
        if (itemTags.includes(tagId)) {
            props.removeTag(itemId, tagId);
        } else {
            props.addTag(itemId, tagId);
        }
    }

    return (
        <Modal closeModal={props.closeModal}>
            {
                commonTags.map(t => (
                    <p key={t.id}>
                        <input 
                          type='checkbox'
                          value={t.id}
                          checked={itemTags.includes(t.id)}
                          onChange={() => onChange(t.id)}/>
                        <label>{t.name}</label>
                    </p>
                ))
            }
        </Modal>
    )
}

export default TagModal;