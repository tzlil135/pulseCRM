import styles from './AvailableEvents.module.css';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { MdFilterListAlt } from 'react-icons/md';
import EventTableSettings from '../../components/EventsTableSettings/EventsTableSettings';
import { IoIosArrowRoundUp } from 'react-icons/io';
import type { EventTableType, EventType } from '../../types/event';
import { getEvents, updateEvent } from '../../service/eventService';
import EventTableButtons from '../../components/EventTableButtons/EventTableButtons';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { eventTableEditSchema } from '../../validations/eventTableEditSchema';
import toast from 'react-hot-toast';
import EventResolvationModal from '../../components/modals/EventResolvationModal/EventResolvationModal';
import { resolveEventSchema } from '../../validations/resolveEventSchema';

export type ZebraColor = 'sky-blue' | 'cotton-candy-pink' | 'light-lemon' | '';

const toTableVM = (c: EventType): EventTableType => ({
    id: c.id,
    eventNumber: c.eventNumber,
    callerName: c.callerName,
    description: c.description,
    assignedTeam: c.assignedTeam,
    location: {
        city: c.location.city,
        street: c.location.street,
        houseNumber: c.location.houseNumber,
    },
    status: c.status,
});


const AvailableEvents = () => {

    const [events, setEvents] = useState<EventTableType[]>([]);

    const refresh = async () => {
        try {
            const data = await getEvents();
            const mapped = data.map(toTableVM);
            setAllEvents(mapped);
            setEvents(mapped);
        } catch (e) {
            console.error('Error loading events:', e);
            setAllEvents([]);
        }
    };

    useEffect(() => {
        refresh();
    }, []);



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
    const [eventsToEdit, setEventsToEdit] = useState<{ [key: string]: boolean }>({});
    const [eventEditValues, setEventEditValues] = useState<{ [key: string]: EventTableType }>({});

    const initial = readInitialEventsListState();

    const [rowsPerPage, setRowsPerPage] = useState<number>(() => initial.rowsPerPage ?? 10);
    const [currentPage, setCurrentPage] = useState<number>(() => initial.page ?? 1);

    const totalPages = Math.max(1, Math.ceil(visibleEvents.length / rowsPerPage));

    const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
    const [resolveText, setResolveText] = useState('');
    const [idsToResolve, setIdsToResolve] = useState<string[]>([]);
    const [resolveError, setResolveError] = useState<string | null>(null);


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

    const onResolve = () => {
        const selectedIds = Object.keys(checkItems).filter(id => checkItems[id]);

        if (selectedIds.length === 0) {
            toast.error('No events selected');
            return;
        }

        setIdsToResolve(selectedIds);
        setResolveText('');
        setResolveError(null);
        setIsResolveModalOpen(true);
    };

    const handleConfirmResolve = async () => {
        const { error } = resolveEventSchema.validate(
            { resolvation: resolveText },
            { abortEarly: false }
        );

        if (error) {
            setResolveError(error.details[0].message);
            return;
        }

        setResolveError(null);

        try {
            await Promise.all(
                idsToResolve.map(id =>
                    updateEvent(id, {
                        status: 'closed',
                        resolvation: resolveText,
                    })
                )
            );

            const resolvedCount = idsToResolve.length;

            await refresh();

            if (resolvedCount === 1) {
                toast.success('Event resolved!');
            } else {
                toast.success(`${resolvedCount} events resolved!`);
            }

            setCheckItems({});
            setSelectAll(false);
            setEventsToEdit({});
            setEventEditValues({});
            setIsEditing(false);

            setIsResolveModalOpen(false);
            setIdsToResolve([]);
            setResolveText('');
        } catch (e: any) {
            toast.error(e?.message || 'Failed to resolve events');
        }
    };

    const handleCancelResolve = () => {
        setIsResolveModalOpen(false);
        setIdsToResolve([]);
        setResolveText('');
        setResolveError(null);
    };


    const onTag = () => {
        console.log('Tag action triggered');
    }

    const onEdit = async () => {
        if (isEditing) {
            for (const id in eventsToEdit) {
                const e = eventEditValues[id];

                const partialEvent = {
                    callerName: e.callerName,
                    description: e.description,
                    assignedTeam: e.assignedTeam,
                    location: {
                        city: e.location.city,
                        street: e.location.street,
                        houseNumber: e.location.houseNumber,
                    },
                };

                const { error } = eventTableEditSchema.validate(partialEvent, { abortEarly: false });
                if (error) {
                    toast.error(error.details.map(err => err.message).join('\n'));
                    return;
                }
            }

            try {
                const selectedIds = Object.keys(eventsToEdit);

                await Promise.all(
                    selectedIds.map(id => {
                        const e = eventEditValues[id];
                        return updateEvent(id, {
                            callerName: e.callerName,
                            description: e.description,
                            assignedTeam: e.assignedTeam,
                            location: e.location,
                        });
                    })
                );

                await refresh();

                setEventsToEdit({});
                setEventEditValues({});
                setIsEditing(false);
                setCheckItems({});
                setSelectAll(false);

                toast.success('Events updated!');
            } catch (e: any) {
                toast.error(e?.message || 'Failed to update events');
            }
        } else {
            const newEventsToEdit: { [key: string]: boolean } = {};
            const newEventEditValues: { [key: string]: EventTableType } = {};

            visibleEvents.forEach(event => {
                if (checkItems[event.id]) {
                    newEventsToEdit[event.id] = true;
                    newEventEditValues[event.id] = { ...event };
                }
            });

            setEventsToEdit(newEventsToEdit);
            setEventEditValues(newEventEditValues);
            setIsEditing(true);
        }
    };

    const handleEditChange = (id: string, fieldPath: string, value: string) => {
        setEventEditValues(prev => {
            const updated = { ...prev };
            const eventCopy = { ...updated[id] };
            const keys = fieldPath.split('.');
            let obj: any = eventCopy;
            for (let i = 0; i < keys.length - 1; i++) {
                obj[keys[i]] = { ...obj[keys[i]] };
                obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = value;
            updated[id] = eventCopy;
            return updated;
        });
    };

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
                                        {event.eventNumber}
                                    </td>
                                    <td className={`${styles['table-cell']}`}>
                                        {eventsToEdit[event.id] ? (
                                            <>
                                                <input
                                                    className={styles['input-field']}
                                                    type="text"
                                                    value={eventEditValues[event.id]?.callerName || ''}
                                                    onChange={e => handleEditChange(event.id, 'callerName', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </>
                                        ) : (
                                            event.callerName
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']} ${styles['description-col']}`}>
                                        {eventsToEdit[event.id] ? (
                                            <input
                                                className={styles['input-field']}
                                                type="email"
                                                value={eventEditValues[event.id]?.description || ''}
                                                onChange={e => handleEditChange(event.id, 'description', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            event.description
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']}} ${styles['assigned-team-col']}`}>
                                        {eventsToEdit[event.id] ? (
                                            <input
                                                className={styles['input-field']}
                                                type="tel"
                                                value={eventEditValues[event.id]?.assignedTeam || ''}
                                                onChange={e => handleEditChange(event.id, 'assignedTeam', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            event.assignedTeam
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']}`}>
                                        {eventsToEdit[event.id] ? (
                                            <>
                                                <input
                                                    className={styles['input-field1']}
                                                    type="text"
                                                    value={eventEditValues[event.id]?.location.street || ''}
                                                    onChange={e => handleEditChange(event.id, 'location.street', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <input
                                                    className={styles['input-field1']}
                                                    type="text"
                                                    value={eventEditValues[event.id]?.location.city || ''}
                                                    onChange={e => handleEditChange(event.id, 'location.city', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <input
                                                    className={styles['input-field1']}
                                                    type="text"
                                                    value={eventEditValues[event.id]?.location.houseNumber || ''}
                                                    onChange={e => handleEditChange(event.id, 'location.houseNumber', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </>
                                        ) : (
                                            `${event.location.street}, ${event.location.city}, ${event.location.houseNumber}`
                                        )}
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
                                                <EventTableButtons onResolve={onResolve} onTag={onTag} onEdit={onEdit} isEditing={isEditing} />
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
            <EventResolvationModal
                isOpen={isResolveModalOpen}
                value={resolveText}
                onChange={(value) => {
                    setResolveText(value);
                    if (resolveError) setResolveError(null);
                }}
                onConfirm={handleConfirmResolve}
                onCancel={handleCancelResolve}
                error={resolveError}
            />
        </>
    );
}

export default AvailableEvents;