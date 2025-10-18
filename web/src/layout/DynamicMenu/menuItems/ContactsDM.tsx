import styles from './MenuItems.module.css';
import { useNavigate } from 'react-router-dom';
import { IoAddSharp } from 'react-icons/io5';
import { VscRefresh } from 'react-icons/vsc';
import { CiExport } from 'react-icons/ci';
import { useContactsGlobalFilterContext } from '../../../contexts/ContactsGlobalFilter';

const ContactsDM = () => {

    const { currentValue, setCurrentValue, clearValue } = useContactsGlobalFilterContext();

    const navigate = useNavigate();

    const handleAddContact = () => {
        navigate('/add-contact');
    };
    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li >
                        <button className={styles['menu-button']} onClick={handleAddContact}>
                            <span>Add Contact</span>
                            <span className={styles['icon-margin']}><IoAddSharp /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Refresh</span>
                            <span className={styles['icon-margin']}><VscRefresh /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Export</span>
                            <span className={styles['icon-margin']}><CiExport /></span>
                        </button>
                    </li>
                </ul>
                <div className={styles['navbar-right']}>
                    <div className={styles['search-container']}>
                        <label htmlFor="contacts-global-filter">Filter</label>
                        <input
                            type="text"
                            id="contacts-global-filter"
                            placeholder="Filter by keyword..."
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                        />
                        {currentValue && <button onClick={clearValue} className={styles['clear-button']}>Clear</button>}
                    </div>
                </div>
            </div>
        </>
    );

}

export default ContactsDM;