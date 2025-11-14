import styles from './EventResolvationModal.module.css';
import type { FormEvent } from 'react';

type EventResolvationModalProps = {
    isOpen: boolean;
    value: string;
    onChange: (value: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
    error?: string | null;
};

const EventResolvationModal = (
    { isOpen, value, onChange, onConfirm, onCancel, error }: EventResolvationModalProps
) => {

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onConfirm();
    };

    return (
        <>
            <div className={styles['backdrop']}>
                <form className={styles['event-resolvation-modal']} onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
                    <h3>Resolve Events</h3>
                    <div className={styles['input-group']}>
                        <label htmlFor="resolution-note">Resolution Notes:</label>
                        <input id="resolution-note"
                            className={styles['resolution-note']}
                            placeholder="Enter resolution notes here..."
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        ></input>
                        {error && <span className={styles['error-message']}>{error}</span>}
                    </div>
                    <div className={styles['button-group']}>
                        <button type="submit" className={styles['resolve-button']}>Resolve</button>
                        <button type="button" className={styles['cancel-button']} onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div >
        </>
    );
};

export default EventResolvationModal;