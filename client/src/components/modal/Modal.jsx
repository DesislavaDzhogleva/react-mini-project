import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModal} onClick={closeModal}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;