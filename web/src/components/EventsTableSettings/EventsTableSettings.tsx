import styles from './EventsTableSettings.module.css';
import toast, { Toaster } from 'react-hot-toast';
import type { Dispatch, SetStateAction } from 'react';
import type { ZebraColor } from '../../Pages/AvailableEvents/AvailableEvents';

type EventTableSettingsProps = {
    isColumnResizingEnabled: boolean;
    setIsColumnResizingEnabled: (value: boolean) => void;

    isZebraStripingEnabled: boolean;
    setIsZebraStripingEnabled: (value: boolean) => void;

    zebraStripingColor: ZebraColor;
    setZebraStripingColor: Dispatch<SetStateAction<ZebraColor>>;

    eventNumberColumnVisible: boolean;
    setEventNumberColumnVisible: (value: boolean) => void;

    callerNameColumnVisible: boolean;
    setCallerNameColumnVisible: (value: boolean) => void;

    descriptionColumnVisible: boolean;
    setDescriptionColumnVisible: (value: boolean) => void;

    assignedTeamColumnVisible: boolean;
    setAssignedTeamColumnVisible: (value: boolean) => void;

    locationColumnVisible: boolean;
    setLocationColumnVisible: (value: boolean) => void;

    onCancel: () => void;
};

const EventTableSettings = ({
    isColumnResizingEnabled,
    setIsColumnResizingEnabled,

    isZebraStripingEnabled,
    setIsZebraStripingEnabled,

    zebraStripingColor,
    setZebraStripingColor,

    eventNumberColumnVisible,
    setEventNumberColumnVisible,

    callerNameColumnVisible,
    setCallerNameColumnVisible,

    descriptionColumnVisible,
    setDescriptionColumnVisible,

    assignedTeamColumnVisible,
    setAssignedTeamColumnVisible,

    locationColumnVisible,
    setLocationColumnVisible,

    onCancel,
}: EventTableSettingsProps) => {

    const handleSave = () => {
        localStorage.setItem('eventsTableSettings', JSON.stringify({
            isColumnResizingEnabled,
            isZebraStripingEnabled,
            zebraStripingColor,
            eventNumberColumnVisible,
            callerNameColumnVisible,
            descriptionColumnVisible,
            assignedTeamColumnVisible,
            locationColumnVisible
        }));
        toast.success('Settings saved');
    }

    return (
        <form className={styles['form-container']} onSubmit={e => e.preventDefault()}>
            <Toaster />
            <div className={styles['form-content']}>
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        <input
                            type="checkbox"
                            checked={isColumnResizingEnabled}
                            onChange={e => setIsColumnResizingEnabled(e.target.checked)}
                        />
                        <span>Enable column resizing</span>
                    </label>
                </div>

                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        <input
                            type="checkbox"
                            checked={isZebraStripingEnabled}
                            onChange={e => setIsZebraStripingEnabled(e.target.checked)}
                        />
                        <span>Enable zebra striping</span>
                    </label>

                    {isZebraStripingEnabled && (
                        <div className={styles['zebra-striping-options']}>
                            <label
                                className={`${styles['zebra-striping-option']} ${styles['zebra-striping-option--sky-blue']} ${zebraStripingColor === 'sky-blue' ? styles['active-blue'] : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="zebraStripingColor"
                                    checked={zebraStripingColor === 'sky-blue'}
                                    onChange={() => setZebraStripingColor('sky-blue')}
                                />
                                <span>Sky Blue</span>
                            </label>

                            <label
                                className={`${styles['zebra-striping-option']} ${styles['zebra-striping-option--cotton-candy-pink']} ${zebraStripingColor === 'cotton-candy-pink' ? styles['active-pink'] : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="zebraStripingColor"
                                    checked={zebraStripingColor === 'cotton-candy-pink'}
                                    onChange={() => setZebraStripingColor('cotton-candy-pink')}
                                />
                                <span>Cotton Candy Pink</span>
                            </label>

                            <label
                                className={`${styles['zebra-striping-option']} ${styles['zebra-striping-option--light-lemon']} ${zebraStripingColor === 'light-lemon' ? styles['active-yellow'] : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="zebraStripingColor"
                                    checked={zebraStripingColor === 'light-lemon'}
                                    onChange={() => setZebraStripingColor('light-lemon')}
                                />
                                <span>Light Lemon</span>
                            </label>
                        </div>
                    )}
                </div>

                <div className={styles['form-group-columns']}>
                    <span className={styles['form-label-title']}>Manage columns</span>
                    <div className={styles['form-label-columns']}>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={eventNumberColumnVisible}
                                onChange={e => setEventNumberColumnVisible(e.target.checked)}
                            />
                            <span>Event Number</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={callerNameColumnVisible}
                                onChange={e => setCallerNameColumnVisible(e.target.checked)}
                            />
                            <span>Caller Name</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={descriptionColumnVisible}
                                onChange={e => setDescriptionColumnVisible(e.target.checked)}
                            />
                            <span>Description</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={assignedTeamColumnVisible}
                                onChange={e => setAssignedTeamColumnVisible(e.target.checked)}
                            />
                            <span>Assigned Team</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={locationColumnVisible}
                                onChange={e => setLocationColumnVisible(e.target.checked)}
                            />
                            <span>Location</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles['form-actions']}>
                <button
                    type="submit"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button type="button" onClick={onCancel}>Close</button>
            </div>
        </form>
    );
};

export default EventTableSettings;