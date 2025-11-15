import { useEffect, useState } from 'react';
import styles from './Contacts.module.css';
import type { Contact, ContactTableType } from '../../types/client';
import ContactTableButtons from '../../components/ContactTableButtons/ContactTableButtons';
import toast from 'react-hot-toast';
import { contactTableEditSchema } from '../../validations/contactTableEditSchema';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { IoEllipsisVertical } from 'react-icons/io5';
import ContactTableSettings from '../../components/ContactTableSettings/ContactTableSettings';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { sortContacts } from '../../hooks/useSortContacts';
import { MdFilterListAlt } from 'react-icons/md';
import ContactFilter from '../../components/ContactFilter/ContactFilter';
import type { FilterType } from '../../types/fitchers';
import { filterContacts } from '../../hooks/contactFilter';
import { filterContactsGlobal } from '../../utils/filterContactsGlobal';
import { useContactsGlobalFilterContext } from '../../contexts/ContactsGlobalFilter';
import { getContacts, deleteContact, updateContact } from '../../service/contactService';
import type { ClientType } from '../../types/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBackBtn } from '../../contexts/BackBtn';


export type ZebraColor = 'sky-blue' | 'cotton-candy-pink' | 'light-lemon' | '';

const toTableVM = (c: ClientType): ContactTableType => ({
    id: c._id,
    name: c.name,
    address: c.address,
    email: c.email,
    phone: c.phone,
    company: c.company ?? ''
});

const Contacts = () => {

    const [contacts, setContacts] = useState<ContactTableType[]>([]);

    const refresh = async () => {
        const data = await getContacts();
        setContacts(data.map(toTableVM));
    };


    const readInitialListState = () => {
        const shouldRestore = sessionStorage.getItem("contacts:restoreOnce") === "1";

        if (shouldRestore) {
            sessionStorage.removeItem("contacts:restoreOnce");
            try {
                const raw = sessionStorage.getItem("contacts:listState");
                const parsed = raw ? JSON.parse(raw) : {};
                console.log('🔧 Restoring state:', parsed);  // ← ADD THIS
                return parsed;
            } catch {
                return {};
            }
        }

        sessionStorage.removeItem("contacts:listState");
        return {};
    };

    const initial = readInitialListState();

    const navigate = useNavigate();
    const location = useLocation();
    const { setLastListURL } = useBackBtn();

    const saveCurrentURLgoToContact = (id: string) => {
        sessionStorage.setItem(
            "contacts:listState",
            JSON.stringify({ page: currentPage, rowsPerPage, sortBy, isAsc, activeFilter })
        );
        sessionStorage.setItem("contacts:restoreOnce", "1");
        setLastListURL(`${location.pathname}${location.search}`);
        navigate(`/contacts/${id}`);
    };


    const [checkItems, setCheckItems] = useState<{ [id: string]: boolean }>({});
    const [selectAll, setSelectAll] = useState(false);

    const [contactsAmount, setContactsAmount] = useState(0);
    const [checkedAmount, setCheckedAmount] = useState(0);

    const [contactsToEdit, setContactsToEdit] = useState<{ [key: string]: boolean }>({});
    const [editValues, setEditValues] = useState<{ [key: string]: Contact }>({});
    const [isEditing, setIsEditing] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState<number>(() => initial.rowsPerPage ?? 10);
    const [currentPage, setCurrentPage] = useState<number>(() => initial.page ?? 1);
    const [displayedContacts, setDisplayedContacts] = useState<ContactTableType[]>([]);

    const [sortedContacts, setSortedContacts] = useState<ContactTableType[]>([]);

    const totalPages = Math.max(1, Math.ceil(sortedContacts.length / rowsPerPage));

    const [activeEllipsis, setActiveEllipsis] = useState(false);

    const [isColumnResizingEnabled, setIsColumnResizingEnabled] = useState(false);
    const [isZebraStripingEnabled, setIsZebraStripingEnabled] = useState(false);
    const [zebraStripingColor, setZebraStripingColor] = useState<ZebraColor>('');

    const [addressColumnVisible, setAddressColumnVisible] = useState(true);
    const [emailColumnVisible, setEmailColumnVisible] = useState(true);
    const [phoneColumnVisible, setPhoneColumnVisible] = useState(true);
    const [companyColumnVisible, setCompanyColumnVisible] = useState(true);

    const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);

    const [isAsc, setIsAsc] = useState<boolean>(() =>
        typeof initial.isAsc === "boolean" ? initial.isAsc : true
    );
    const [sortBy, setSortBy] = useState<keyof ContactTableType | null>(() => initial.sortBy ?? "name");

    const [activeFilter, setActiveFilter] = useState<{ [column: string]: FilterType | null }>(
        () => initial.activeFilter ?? {}
    );

    const { currentValue: globalFilter } = useContactsGlobalFilterContext();

    useEffect(() => {
        let cancelled = false;

        console.log('🚀 Starting fetch...');

        getContacts()
            .then(data => {
                if (cancelled) {
                    return;
                }
                const mapped = data.map(toTableVM);
                setContacts(mapped);
            })
            .catch(e => {
                if (!cancelled) {
                    setContacts([]);
                    toast.error(e?.message || 'Failed to load contacts');
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);


    const handleSort = (column: keyof ContactTableType) => {
        if (sortBy === column) {
            setIsAsc(prev => !prev);
        } else {
            setSortBy(column);
            setIsAsc(true);
        }
        setCurrentPage(1);
    };

    useEffect(() => {

        if (contacts.length === 0) {
            setSortedContacts([]);
            return;
        }

        const byColumns = filterContacts(contacts, activeFilter);

        const byGlobal = filterContactsGlobal(byColumns, globalFilter);

        const sorted = sortContacts(byGlobal, sortBy, isAsc);

        setSortedContacts(sorted);
    }, [contacts, activeFilter, globalFilter, sortBy, isAsc]);


    useEffect(() => {
        setContactsAmount(sortedContacts.length);
    }, [sortedContacts]);

    useEffect(() => {
        const totalSelected = sortedContacts.reduce(
            (count, c) => count + (checkItems[c.id] ? 1 : 0),
            0
        );
        setCheckedAmount(totalSelected);
    }, [sortedContacts, checkItems]);

    useEffect(() => {
        if (sortedContacts.length === 0) return;
        const newTotal = Math.max(1, Math.ceil(sortedContacts.length / rowsPerPage));
        if (currentPage > newTotal) setCurrentPage(newTotal);
    }, [sortedContacts, rowsPerPage]);

    useEffect(() => {
        const all =
            sortedContacts.length > 0 && sortedContacts.every(contact => checkItems[contact.id]);
        setSelectAll(all);
    }, [sortedContacts, checkItems]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setDisplayedContacts(sortedContacts.slice(startIndex, endIndex));
    }, [currentPage, sortedContacts, rowsPerPage]);

    useEffect(() => {
        sessionStorage.setItem(
            "contacts:listState",
            JSON.stringify({ page: currentPage, rowsPerPage, sortBy, isAsc, activeFilter })
        );
    }, [currentPage, rowsPerPage, sortBy, isAsc, activeFilter]);

    const handleCheck = (id: string) => {
        if (isEditing) return;

        setCheckItems(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSelectAll = () => {
        if (isEditing) return;

        const allSelected = sortedContacts.length > 0 && sortedContacts.every(c => checkItems[c.id]);
        const selectEverything = !allSelected;

        const newCheckedItems: { [id: string]: boolean } = { ...checkItems };
        sortedContacts.forEach(c => {
            newCheckedItems[c.id] = selectEverything;
        });

        setCheckItems(newCheckedItems);
        setSelectAll(selectEverything);
    };

    const onDelete = async () => {
        if (isEditing) return;

        const idsToDelete = Object.entries(checkItems)
            .filter(([, v]) => v)
            .map(([id]) => id);

        if (idsToDelete.length === 0) return;

        try {
            await Promise.all(idsToDelete.map(id => deleteContact(id)));
            await refresh();
            setSelectAll(false);
            toast.success(`${checkedAmount} contact${checkedAmount > 1 ? 's' : ''} deleted successfully!`);
        } catch (e: any) {
            toast.error(e?.message || 'Failed to delete contacts');
        }

    };

    const onTag = () => {
        // Implement tagging functionality here
        console.log('Tagging');
    };

    const onEdit = async () => {
        if (isEditing) {
            for (const id in contactsToEdit) {
                const partialContact = {
                    name: editValues[id].name,
                    address: editValues[id].address,
                    phone: editValues[id].phone,
                    email: editValues[id].email,
                    company: editValues[id].company,
                };
                const { error } = contactTableEditSchema.validate(partialContact, { abortEarly: false });
                if (error) {
                    toast.error(error.details.map(err => err.message).join('\n'));
                    return;
                }
            }

            try {
                const selectedIds = Object.keys(contactsToEdit);
                await Promise.all(
                    selectedIds.map(id => {
                        const c = editValues[id];
                        return updateContact(id, {
                            name: c.name,
                            address: c.address,
                            phone: c.phone,
                            email: c.email,
                            company: c.company,
                        });
                    })
                );

                await refresh();
                setContactsToEdit({});
                setEditValues({});
                setIsEditing(false);
                setCheckItems({});
                setSelectAll(false);
                toast.success('Contacts updated!');
            } catch (e: any) {
                toast.error(e?.message || 'Failed to update contacts');
            }
        } else {
            const newContactsToEdit: { [key: string]: boolean } = {};
            const newEditValues: { [key: string]: Contact } = {};

            contacts.forEach(contact => {
                if (checkItems[contact.id]) {
                    newContactsToEdit[contact.id] = true;
                    newEditValues[contact.id] = { ...contact };
                }
            });

            setContactsToEdit(newContactsToEdit);
            setEditValues(newEditValues);
            setIsEditing(true);
        }
    };


    const handleEditChange = (id: string, fieldPath: string, value: string) => {
        setEditValues(prev => {
            const updated = { ...prev };
            const contactCopy = { ...updated[id] };
            const keys = fieldPath.split('.');
            let obj: any = contactCopy;
            for (let i = 0; i < keys.length - 1; i++) {
                obj[keys[i]] = { ...obj[keys[i]] };
                obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = value;
            updated[id] = contactCopy;
            return updated;
        });
    };

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handleActive = () => {
        setActiveEllipsis(prev => !prev);
    };

    const zebraClasses: Record<ZebraColor, string> = {
        'sky-blue': styles['zebra-sky-blue'],
        'cotton-candy-pink': styles['zebra-cotton-candy-pink'],
        'light-lemon': styles['zebra-light-lemon'],
        '': styles['']
    };

    useEffect(() => {
        const savedSettings = localStorage.getItem('contactTableSettings');
        if (savedSettings) {
            try {
                const {
                    isColumnResizingEnabled,
                    isZebraStripingEnabled,
                    zebraStripingColor,
                    addressColumnVisible,
                    emailColumnVisible,
                    phoneColumnVisible,
                    companyColumnVisible
                } = JSON.parse(savedSettings);

                setIsColumnResizingEnabled(isColumnResizingEnabled);
                setIsZebraStripingEnabled(isZebraStripingEnabled);
                setZebraStripingColor(zebraStripingColor);
                setAddressColumnVisible(addressColumnVisible);
                setEmailColumnVisible(emailColumnVisible);
                setPhoneColumnVisible(phoneColumnVisible);
                setCompanyColumnVisible(companyColumnVisible);
            } catch (e) {
                console.error('Invalid settings in localStorage', e);
            }
        }
    }, []);

    const handleFilterClick = (column: string) => {
        setOpenFilterColumn(prev =>
            prev === column ? null : column
        );
    };


    const handleFilterModeChange = (column: string, mode: 'contains' | 'equals') => {
        setActiveFilter(prev => ({
            ...prev,
            [column]: {
                mode,
                value: prev[column]?.value || ''
            }
        }));
    };

    const handleFilterValueChange = (column: string, value: string) => {
        setActiveFilter(prev => ({
            ...prev,
            [column]: {
                mode: prev[column]?.mode || 'contains',
                value
            }
        }));
    };

    const handleFilterApply = () => {
        setCurrentPage(1);
    };


    return (
        <>
            <div className={styles['contacts-container']}>
                <div className={styles['table-header-title']}>
                    <h3 className={styles['table-title']}>Contacts</h3>
                    <div className={styles['ellipsis-container']}>
                        <button className={`${styles['ellipsis-button']} ${activeEllipsis ? styles['active-ellipsis'] : ''}`} onClick={() => { handleActive(); }}>
                            <span><IoEllipsisVertical /></span>
                        </button>
                        {activeEllipsis && (
                            <div className={styles['ellipsis-dropdown']}>
                                <ContactTableSettings
                                    isColumnResizingEnabled={isColumnResizingEnabled}
                                    setIsColumnResizingEnabled={setIsColumnResizingEnabled}
                                    isZebraStripingEnabled={isZebraStripingEnabled}
                                    setIsZebraStripingEnabled={setIsZebraStripingEnabled}
                                    zebraStripingColor={zebraStripingColor}
                                    setZebraStripingColor={setZebraStripingColor}
                                    addressColumnVisible={addressColumnVisible}
                                    setAddressColumnVisible={setAddressColumnVisible}
                                    emailColumnVisible={emailColumnVisible}
                                    setEmailColumnVisible={setEmailColumnVisible}
                                    phoneColumnVisible={phoneColumnVisible}
                                    setPhoneColumnVisible={setPhoneColumnVisible}
                                    companyColumnVisible={companyColumnVisible}
                                    setCompanyColumnVisible={setCompanyColumnVisible}
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
                                <th className={``}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Name</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']} onClick={() => handleSort('name')}>{sortBy === 'name' ? (isAsc ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />) : <IoIosArrowRoundUp style={{ opacity: 0.3 }} />}</button>
                                            <button
                                                className={`${styles['filter-button']} ${openFilterColumn === 'name' ? styles['active-filter'] : ''}`}
                                                onClick={() => handleFilterClick('name')}
                                            >
                                                <MdFilterListAlt />
                                            </button>

                                            {openFilterColumn === 'name' && (
                                                <ContactFilter
                                                    column="name"
                                                    filter={activeFilter['name'] || { mode: 'contains', value: '' }}
                                                    onChangeMode={(mode) => handleFilterModeChange('name', mode)}
                                                    onChangeValue={(value) => handleFilterValueChange('name', value)}
                                                    onApply={handleFilterApply}
                                                />
                                            )}

                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={` ${!addressColumnVisible ? styles['invisible-col'] : ''}`}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Address</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']} onClick={() => handleSort('address')}>{sortBy === 'address' ? (isAsc ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />) : <IoIosArrowRoundUp style={{ opacity: 0.3 }} />}</button>
                                            <button
                                                className={`${styles['filter-button']} ${openFilterColumn === 'address' ? styles['active-filter'] : ''}`}
                                                onClick={() => handleFilterClick('address')}
                                            >
                                                <MdFilterListAlt />
                                            </button>

                                            {openFilterColumn === 'address' && (
                                                <ContactFilter
                                                    column="address"
                                                    filter={activeFilter['address'] || { mode: 'contains', value: '' }}
                                                    onChangeMode={(mode) => handleFilterModeChange('address', mode)}
                                                    onChangeValue={(value) => handleFilterValueChange('address', value)}
                                                    onApply={handleFilterApply}
                                                />
                                            )}

                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={` ${styles['email-col']} ${!emailColumnVisible ? styles['invisible-col'] : ''}`}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Email</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']} onClick={() => handleSort('email')}>{sortBy === 'email' ? (isAsc ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />) : <IoIosArrowRoundUp style={{ opacity: 0.3 }} />}</button>
                                            <button
                                                className={`${styles['filter-button']} ${openFilterColumn === 'email' ? styles['active-filter'] : ''}`}
                                                onClick={() => handleFilterClick('email')}
                                            >
                                                <MdFilterListAlt />
                                            </button>

                                            {openFilterColumn === 'email' && (
                                                <ContactFilter
                                                    column="email"
                                                    filter={activeFilter['email'] || { mode: 'contains', value: '' }}
                                                    onChangeMode={(mode) => handleFilterModeChange('email', mode)}
                                                    onChangeValue={(value) => handleFilterValueChange('email', value)}
                                                    onApply={handleFilterApply}
                                                />
                                            )}

                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={` ${!phoneColumnVisible ? styles['invisible-col'] : ''}`}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Phone</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']} onClick={() => handleSort('phone')}>{sortBy === 'phone' ? (isAsc ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />) : <IoIosArrowRoundUp style={{ opacity: 0.3 }} />}</button>
                                            <button
                                                className={`${styles['filter-button']} ${openFilterColumn === 'phone' ? styles['active-filter'] : ''}`}
                                                onClick={() => handleFilterClick('phone')}
                                            >
                                                <MdFilterListAlt />
                                            </button>

                                            {openFilterColumn === 'phone' && (
                                                <ContactFilter
                                                    column="phone"
                                                    filter={activeFilter['phone'] || { mode: 'contains', value: '' }}
                                                    onChangeMode={(mode) => handleFilterModeChange('phone', mode)}
                                                    onChangeValue={(value) => handleFilterValueChange('phone', value)}
                                                    onApply={handleFilterApply}
                                                />
                                            )}

                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                                <th className={` ${!companyColumnVisible ? styles['invisible-col'] : ''}`}>
                                    <div className={`${styles['table-header-title']}`}>
                                        <span>Company</span>
                                        <div className={styles['sort-buttons']}>
                                            <button className={styles['ascending-button']} onClick={() => handleSort('company')}>{sortBy === 'company' ? (isAsc ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />) : <IoIosArrowRoundUp style={{ opacity: 0.3 }} />}</button>
                                            <button
                                                className={`${styles['filter-button']} ${openFilterColumn === 'company' ? styles['active-filter'] : ''}`}
                                                onClick={() => handleFilterClick('company')}
                                            >
                                                <MdFilterListAlt />
                                            </button>

                                            {openFilterColumn === 'company' && (
                                                <ContactFilter
                                                    column="company"
                                                    filter={activeFilter['company'] || { mode: 'contains', value: '' }}
                                                    onChangeMode={(mode) => handleFilterModeChange('company', mode)}
                                                    onChangeValue={(value) => handleFilterValueChange('company', value)}
                                                    onApply={handleFilterApply}
                                                />
                                            )}

                                            <div className={styles['resizer']}></div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedContacts.map((contact, index) => (
                                <tr
                                    key={contact.id}
                                    className={`${styles['table-row']} ${checkItems[contact.id] ? styles['row-checked'] : ''} ${isZebraStripingEnabled && index % 2 === 1 ? zebraClasses[zebraStripingColor] : ''
                                        }`}
                                >
                                    <td className={`${styles['table-cell']}`}>
                                        <div
                                            className={`${styles['custom-checkbox']} ${checkItems[contact.id] ? styles['checked'] : ''}`}
                                            onClick={(e) => { e.stopPropagation(); handleCheck(contact.id) }}
                                            role="checkbox"
                                            aria-checked={!!checkItems[contact.id]}
                                            tabIndex={0}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' || e.key === ' ') handleCheck(contact.id);
                                            }}
                                            aria-label={`Select contact ${contact.name.firstName} ${contact.name.lastName}`}
                                        >
                                            {checkItems[contact.id] && <div className={styles['checkbox-dot']} />}
                                        </div>
                                    </td>
                                    <td className={`${styles['table-cell']} ${styles['contact-name-col1']}`} onClick={() => { if (!isEditing) saveCurrentURLgoToContact(contact.id); }}>
                                        {contactsToEdit[contact.id] ? (
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
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']} ${!addressColumnVisible ? styles['invisible-col'] : ''}`}>
                                        {contactsToEdit[contact.id] ? (
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
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']} ${styles['email-col']} ${!emailColumnVisible ? styles['invisible-col'] : ''}`}>
                                        {contactsToEdit[contact.id] ? (
                                            <input
                                                className={styles['input-field1']}
                                                type="email"
                                                value={editValues[contact.id]?.email || ''}
                                                onChange={e => handleEditChange(contact.id, 'email', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            contact.email
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']} ${!phoneColumnVisible ? styles['invisible-col'] : ''}`}>
                                        {contactsToEdit[contact.id] ? (
                                            <input
                                                className={styles['input-field1']}
                                                type="tel"
                                                value={editValues[contact.id]?.phone || ''}
                                                onChange={e => handleEditChange(contact.id, 'phone', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            contact.phone
                                        )}
                                    </td>
                                    <td className={`${styles['table-cell']} ${!companyColumnVisible ? styles['invisible-col'] : ''}`}>
                                        {contactsToEdit[contact.id] ? (
                                            <input
                                                className={styles['input-field1']}
                                                type="text"
                                                value={editValues[contact.id]?.company || ''}
                                                onChange={e => handleEditChange(contact.id, 'company', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            contact.company
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
                                                <ContactTableButtons onDelete={onDelete} onTag={onTag} onEdit={onEdit} isEditing={isEditing} />
                                            )}
                                            <span>
                                                Selected {checkedAmount} out of {contactsAmount}
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
};

export default Contacts;


