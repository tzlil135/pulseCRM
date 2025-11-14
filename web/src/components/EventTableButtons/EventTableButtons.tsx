import { MdEdit } from 'react-icons/md';
import styles from './EventTableButtons.module.css';
import { FaTag } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';
import { IoMdDoneAll } from "react-icons/io";

type EventTableButtonsProps = {
    onResolve?: () => void;
    onTag?: () => void;
    onEdit?: () => void;
    isEditing: boolean;

};

const eventTableButtons = ({ onResolve, onTag, onEdit, isEditing }: EventTableButtonsProps) => {
    return (
        <>
            <div className={styles['button-container']}>
                <button
                    className={`${styles['circle-button']} ${styles['pink']} ${isEditing ? styles['button-at-edit-mode'] : ''}`} onClick={onResolve}>
                    <span className={styles['button-label']}>Resolve</span>
                    <span className={styles['icon']}>
                        <IoMdDoneAll />
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

export default eventTableButtons;