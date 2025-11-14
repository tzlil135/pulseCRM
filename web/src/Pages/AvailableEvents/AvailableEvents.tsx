import styles from './AvailableEvents.module.css';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { MdFilterListAlt } from 'react-icons/md';
import EventTableSettings from '../../components/EventsTableSettings/EventsTableSettings';
import { IoIosArrowRoundUp } from 'react-icons/io';
import type { EventTableType, EventType } from '../../types/event';
import { getEvents } from '../../service/eventService';
import EventTableButtons from '../../components/EventTableButtons/EventTableButtons';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export type ZebraColor = 'sky-blue' | 'cotton-candy-pink' | 'light-lemon' | '';


const AvailableEvents = () => {

    const readInitialEventsListState = () => {
        const shouldRestore = sessionStorage.getItem("events:restoreOnce") === "1";
        if (shouldRestore) {
            sessionStorage.removeItem("events:restoreOnce");
            try {
                const raw = sessionStorage.getItem("events:listState");
                const parsed = raw ? JSON.parse(raw) : {};
                return parsed;
            } catch {
                return {};
            }
        }
        sessionStorage.removeItem("events:listState");
        return {};
    };

    const [selectAll, setSelectAll] = useState(false);

    const [activeEllipsis, setActiveEllipsis] = useState(false);

    const [isColumnResizingEnabled, setIsColumnResizingEnabled] = useState(false);
    const [isZebraStripingEnabled, setIsZebraStripingEnabled] = useState(false);
    const [zebraStripingColor, setZebraStripingColor] = useState<ZebraColor>('');

    const [callerNameColumnVisible, setCallerNameColumnVisible] = useState(true);
    const [descriptionColumnVisible, setDescriptionColumnVisible] = useState(true);
    const [assignedTeamColumnVisible, setAssignedTeamColumnVisible] = useState(true);
    const [locationColumnVisible, setLocationColumnVisible] = useState(true);

    const [displayedEvents, setDisplayedEvents] = useState<EventTableType[]>([]);
    const [allEvents, setAllEvents] = useState<EventTableType[]>([]);
    const [visibleEvents, setVisibleEvents] = useState<EventTableType[]>([]);

    const [checkItems, setCheckItems] = useState<{ [id: string]: boolean }>({});
    const [eventsAmount, setEventsAmount] = useState(0);
    const [checkedAmount, setCheckedAmount] = useState(0);

    const [isEditing, setIsEditing] = useState(false);

    const initial = readInitialEventsListState();

    const [rowsPerPage, setRowsPerPage] = useState<number>(() => initial.rowsPerPage ?? 10);
    const [currentPage, setCurrentPage] = useState<number>(() => initial.page ?? 1);

    const totalPages = Math.max(1, Math.ceil(visibleEvents.length / rowsPerPage));



    const handleActive = () => {
        setActiveEllipsis(prev => !prev);
    };

    useEffect(() => {
        const savedSettings = localStorage.getItem('eventsTableSettings');
        if (savedSettings) {
            try {
                const {
                    isColumnResizingEnabled,
                    isZebraStripingEnabled,
                    zebraStripingColor,
                    callerNameColumnVisible,
                    descriptionColumnVisible,
                    assignedTeamColumnVisible,
                    locationColumnVisible
                } = JSON.parse(savedSettings);

                setIsColumnResizingEnabled(isColumnResizingEnabled);
                setIsZebraStripingEnabled(isZebraStripingEnabled);
                setZebraStripingColor(zebraStripingColor);
                setCallerNameColumnVisible(callerNameColumnVisible);
                setDescriptionColumnVisible(descriptionColumnVisible);
                setAssignedTeamColumnVisible(assignedTeamColumnVisible);
                setLocationColumnVisible(locationColumnVisible);

            } catch (e) {
                console.error('Invalid settings in localStorage', e);
            }
        }
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                const mapped = data.map((event: EventType) => ({
                    id: event.id,
                    eventNumber: event.eventNumber,
                    callerName: event.callerName,
                    description: event.description,
                    assignedTeam: event.assignedTeam,
                    location: {
                        city: event.location.city,
                        street: event.location.street,
                        houseNumber: event.location.houseNumber,
                    },
                    status: event.status,
                }));

                setAllEvents(mapped);
            } catch (error) {
                console.error('Error loading events:', error);
                setAllEvents([]);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const openEvents = allEvents.filter(e => e.status === 'open');
        setVisibleEvents(openEvents);
    }, [allEvents]);

    useEffect(() => {
        const total = Math.max(1, Math.ceil(visibleEvents.length / rowsPerPage));
        if (currentPage > total) setCurrentPage(total);

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageEvents = visibleEvents.slice(start, end);

        setDisplayedEvents(pageEvents);
    }, [visibleEvents, currentPage, rowsPerPage]);

    useEffect(() => {
        setEventsAmount(visibleEvents.length);
    }, [visibleEvents]);



    const handleCheck = (id: string) => {
        if (isEditing) return;

        setCheckItems(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSelectAll = () => {
        if (isEditing) return;

        const allSelected = displayedEvents.length > 0 && displayedEvents.every(c => checkItems[c.id]);
        const selectEverything = !allSelected;

        const newCheckedItems: { [id: string]: boolean } = { ...checkItems };
        displayedEvents.forEach(c => {
            newCheckedItems[c.id] = selectEverything;
        });

        setCheckItems(newCheckedItems);
        setSelectAll(selectEverything);
    };

    useEffect(() => {
        const checkedCount = Object.values(checkItems).filter(v => v).length;
        setCheckedAmount(checkedCount);
    }, [checkItems]);

    const onDelete = () => {
        console.log('Delete action triggered');
    }

    const onTag = () => {
        console.log('Tag action triggered');
    }

    const onEdit = () => {
        setIsEditing(prev => !prev);
    }

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };


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
                            {displayedEvents.map((event, index) => (
                                <tr
                                    key={event.id}
                                    className={`${styles['table-row']} ${checkItems[event.id] ? styles['row-checked'] : ''}`}
                                >
                                    <td className={`${styles['table-cell']}`}>
                                        <div
                                            className={`${styles['custom-checkbox']} ${checkItems[event.id] ? styles['checked'] : ''}`}
                                            onClick={(e) => { e.stopPropagation(); handleCheck(event.id) }}
                                            role="checkbox"
                                            aria-checked={!!checkItems[event.id]}
                                            tabIndex={0}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' || e.key === ' ') handleCheck(event.id);
                                            }}
                                            aria-label={`Select event ${event.callerName}`}
                                        >
                                            {checkItems[event.id] && <div className={styles['checkbox-dot']} />}
                                        </div>
                                    </td>
                                    <td className={`${styles['table-cell']}`}>
                                        {/* {contactsToEdit[contact.id] ? (
                                            <>
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={editValues[contact.id]?.name.firstName || ''}
                                                    onChange={e => handleEditChange(contact.id, 'name.firstName', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={editValues[contact.id]?.name.middleName || ''}
                                                    onChange={e => handleEditChange(contact.id, 'name.middleName', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={editValues[contact.id]?.name.lastName || ''}
                                                    onChange={e => handleEditChange(contact.id, 'name.lastName', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </>
                                        ) : (
                                            `${contact.name.firstName} ${contact.name.middleName ?? ''} ${contact.name.lastName}`
                                        )} */}
                                        {event.eventNumber}
                                    </td>
                                    <td className={`${styles['table-cell']}`}>
                                        {/* {contactsToEdit[contact.id] ? (
                                            <>
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={editValues[contact.id]?.address.street || ''}
                                                    onChange={e => handleEditChange(contact.id, 'address.street', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={editValues[contact.id]?.address.city || ''}
                                                    onChange={e => handleEditChange(contact.id, 'address.city', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={editValues[contact.id]?.address.houseNumber || ''}
                                                    onChange={e => handleEditChange(contact.id, 'address.houseNumber', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </>
                                        ) : (
                                            `${contact.address.street}, ${contact.address.city}, ${contact.address.houseNumber}`
                                        )} */}
                                        {event.callerName}
                                    </td>
                                    <td className={`${styles['table-cell']} ${styles['description-col']}`}>
                                        {/* {contactsToEdit[contact.id] ? (
                                            <input
                                                className={styles['input-field1']}
                                                type="email"
                                                value={editValues[contact.id]?.email || ''}
                                                onChange={e => handleEditChange(contact.id, 'email', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            contact.email
                                        )} */}
                                        {event.description}
                                    </td>
                                    <td className={`${styles['table-cell']}} ${styles['assigned-team-col']}`}>
                                        {/* {contactsToEdit[contact.id] ? (
                                            <input
                                                className={styles['input-field1']}
                                                type="tel"
                                                value={editValues[contact.id]?.phone || ''}
                                                onChange={e => handleEditChange(contact.id, 'phone', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            contact.phone
                                        )} */}
                                        {event.assignedTeam}
                                    </td>
                                    <td className={`${styles['table-cell']}`}>
                                        {/* {contactsToEdit[contact.id] ? (
                                            <input
                                                className={styles['input-field1']}
                                                type="text"
                                                value={editValues[contact.id]?.company || ''}
                                                onChange={e => handleEditChange(contact.id, 'company', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            contact.company
                                        )} */}
                                        {`${event.location.street}, ${event.location.city}, ${event.location.houseNumber}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot className={styles['table-footer']}>
                            <tr>
                                <td className={styles['table-footer-cell']} style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            {checkedAmount > 0 && (
                                                <EventTableButtons onDelete={onDelete} onTag={onTag} onEdit={onEdit} isEditing={isEditing} />
                                            )}
                                            <span>
                                                Selected {checkedAmount} out of {eventsAmount}
                                            </span>
                                        </div>
                                        <div className={styles['pagination']}>
                                            <span className={styles['pagination-info']}>
                                                <button onClick={handlePreviousPage}>
                                                    <GrFormPrevious />
                                                </button>
                                                {`${currentPage} of ${totalPages}`}
                                                <button onClick={handleNextPage}>
                                                    <GrFormNext />
                                                </button>
                                            </span>
                                            <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AvailableEvents;