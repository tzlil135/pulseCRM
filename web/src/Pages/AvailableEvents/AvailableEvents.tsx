import styles from './AvailableEvents.module.css';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { MdFilterListAlt } from 'react-icons/md';
import EventTableSettings from '../../components/EventsTableSettings/EventsTableSettings';
import { IoIosArrowRoundUp } from 'react-icons/io';


export type ZebraColor = 'sky-blue' | 'cotton-candy-pink' | 'light-lemon' | '';


const AvailableEvents = () => {

    const [selectAll, setSelectAll] = useState(false);

    const [activeEllipsis, setActiveEllipsis] = useState(false);

    const [isColumnResizingEnabled, setIsColumnResizingEnabled] = useState(false);
    const [isZebraStripingEnabled, setIsZebraStripingEnabled] = useState(false);
    const [zebraStripingColor, setZebraStripingColor] = useState<ZebraColor>('');

    const [eventNumberColumnVisible, setEventNumberColumnVisible] = useState(true);
    const [callerNameColumnVisible, setCallerNameColumnVisible] = useState(true);
    const [descriptionColumnVisible, setDescriptionColumnVisible] = useState(true);
    const [assignedTeamColumnVisible, setAssignedTeamColumnVisible] = useState(true);
    const [locationColumnVisible, setLocationColumnVisible] = useState(true);

    const handleActive = () => {
        setActiveEllipsis(prev => !prev);
    };

    const handleSelectAll = () => {
        setSelectAll(prev => !prev);
    };

    useEffect(() => {
        const savedSettings = localStorage.getItem('eventsTableSettings');
        if (savedSettings) {
            try {
                const {
                    isColumnResizingEnabled,
                    isZebraStripingEnabled,
                    zebraStripingColor,
                    eventNumberColumnVisible,
                    callerNameColumnVisible,
                    descriptionColumnVisible,
                    assignedTeamColumnVisible,
                    locationColumnVisible
                } = JSON.parse(savedSettings);

                setIsColumnResizingEnabled(isColumnResizingEnabled);
                setIsZebraStripingEnabled(isZebraStripingEnabled);
                setZebraStripingColor(zebraStripingColor);
                setEventNumberColumnVisible(eventNumberColumnVisible);
                setCallerNameColumnVisible(callerNameColumnVisible);
                setDescriptionColumnVisible(descriptionColumnVisible);
                setAssignedTeamColumnVisible(assignedTeamColumnVisible);
                setLocationColumnVisible(locationColumnVisible);

            } catch (e) {
                console.error('Invalid settings in localStorage', e);
            }
        }
    }, []);

    return (
        <>
            <div className={styles['contacts-container']}>
                <div className={styles['table-header-title']}>
                    <h3 className={styles['table-title']}>Available Events</h3>
                    <div className={styles['ellipsis-container']}>
                        <button className={`${styles['ellipsis-button']} ${activeEllipsis ? styles['active-ellipsis'] : ''}`} onClick={() => { handleActive(); }}>
                            <span><IoEllipsisVertical /></span>
                        </button>
                        {activeEllipsis && (
                            <div className={styles['ellipsis-dropdown']}>
                                <EventTableSettings
                                    isColumnResizingEnabled={isColumnResizingEnabled}
                                    setIsColumnResizingEnabled={setIsColumnResizingEnabled}
                                    isZebraStripingEnabled={isZebraStripingEnabled}
                                    setIsZebraStripingEnabled={setIsZebraStripingEnabled}
                                    zebraStripingColor={zebraStripingColor}
                                    setZebraStripingColor={setZebraStripingColor}
                                    eventNumberColumnVisible={eventNumberColumnVisible}
                                    setEventNumberColumnVisible={setEventNumberColumnVisible}
                                    callerNameColumnVisible={callerNameColumnVisible}
                                    setCallerNameColumnVisible={setCallerNameColumnVisible}
                                    descriptionColumnVisible={descriptionColumnVisible}
                                    setDescriptionColumnVisible={setDescriptionColumnVisible}
                                    assignedTeamColumnVisible={assignedTeamColumnVisible}
                                    setAssignedTeamColumnVisible={setAssignedTeamColumnVisible}
                                    locationColumnVisible={locationColumnVisible}
                                    setLocationColumnVisible={setLocationColumnVisible}
                                    onCancel={() => setActiveEllipsis(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles['table-container']}>
                    <table className={styles['table-wrapper']}>
                        <thead className={styles['table-header']}>
                            <tr>
                                <th className={styles['table-cell']}>
                                    <div
                                        className={`${styles['custom-checkbox']} ${selectAll ? styles['checked'] : ''}`}
                                        onClick={handleSelectAll}
                                        role="checkbox"
                                        aria-checked={selectAll}
                                        tabIndex={0}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' || e.key === ' ') handleSelectAll();
                                        }}
                                        aria-label="Select all contacts"
                                    >
                                        {selectAll && <div className={styles['checkbox-dot']} />}
                                    </div>
                                </th>
                                <th className={`${styles['event-number-col']}`}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Event No.</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']}><IoIosArrowRoundUp /></button>
                                            <button className={`${styles['filter-button']} `}>
                                                <MdFilterListAlt />
                                            </button>
                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={``}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Caller Name</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']}><IoIosArrowRoundUp /></button>
                                            <button className={`${styles['filter-button']} `}>
                                                <MdFilterListAlt />
                                            </button>
                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={`${styles['description-col']}`}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Description</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']}><IoIosArrowRoundUp /></button>
                                            <button className={`${styles['filter-button']} `}>
                                                <MdFilterListAlt />
                                            </button>
                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={``}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Assigned Team</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']}><IoIosArrowRoundUp /></button>
                                            <button className={`${styles['filter-button']} `}>
                                                <MdFilterListAlt />
                                            </button>
                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={``}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Location</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']}><IoIosArrowRoundUp /></button>
                                            <button className={`${styles['filter-button']} `}>
                                                <MdFilterListAlt />
                                            </button>
                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>

                        <tfoot className={styles['table-footer']}>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AvailableEvents;