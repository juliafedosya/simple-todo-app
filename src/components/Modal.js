import React from 'react';

const Modal = (props) => {

    return (
        <div id='modal-outer-layer' 
        onClick={(e) => {
            if(e.target.id === 'modal-outer-layer') {
                props.closeModal();
            }
        }}>
        <div style={{ backgroundColor : 'white', padding: 20 }}>
            {props.children}
        </div>
        </div>
    )
}

export default Modal;