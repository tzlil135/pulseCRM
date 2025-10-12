import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import styles from './ContactTableButtons.module.css';
import { FaTag } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';

type ContactTableButtonsProps = {
    onDelete?: () => void;
    onTag?: () => void;
    onEdit?: () => void;
    isEditing: boolean;

};

const ContactTableButtons = ({ onDelete, onTag, onEdit, isEditing }: ContactTableButtonsProps) => {
    return (
        <>
            <div className={styles['button-container']}>
                <button
                    className={`${styles['circle-button']} ${styles['pink']} ${isEditing ? styles['button-at-edit-mode'] : ''}`} onClick={onDelete}>
                    <span className={styles['button-label']}>Delete</span>
                    <span className={styles['icon']}>
                        <MdDeleteOutline />
                    </span>
                </button>
                <button className={`${styles['circle-button']} ${styles['blue']} ${isEditing ? styles['button-at-edit-mode'] : ''}`} onClick={onTag}>
                    <span className={styles['button-label']}>Tag</span>
                    <span className={styles['icon']}>
                        <FaTag />
                    </span>
                </button>
                <button className={`${styles['circle-button']} ${styles['orange']} ${isEditing ? styles['edit-button-active'] : ''}`} onClick={onEdit}>
                    <span className={`${styles['button-label']} ${isEditing ? styles['span-edit-button-active'] : ''}`}>
                        {isEditing ? 'Save' : 'Edit'}
                    </span>
                    <span className={`${styles['icon']} ${isEditing ? styles['span-edit-button-active'] : ''}`}>
                        {isEditing ? <CiSaveDown2 /> : <MdEdit />}
                    </span>
                </button>
            </div>
        </>
    );
}

export default ContactTableButtons;