import styles from './ParentEventModal.module.css';

interface ParentEventModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ParentEventModal = ({ isOpen, onConfirm, onCancel }: ParentEventModalProps) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles['backdrop']}>
                <div className={styles['form-container']} onClick={e => e.stopPropagation()}>
                    <h4>Are you sure you want to exit?</h4>
                    <label htmlFor="" className={styles['warning-text']}>
                        Any unsaved changes will be lost.
                        Please save before leaving this page.
                    </label>
                    <div className={styles['button-group']}>
                        <button type="submit" className={styles['confirm-button']} onClick={onConfirm}>Exit</button>
                        <button type="button" className={styles['cancel-button']} onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ParentEventModal;