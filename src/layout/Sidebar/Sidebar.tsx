import { MdEventAvailable, MdEventBusy, MdEvent, MdContacts, MdDashboard } from 'react-icons/md';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className={styles['sidebar']}>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? `${styles['navlink']} ${styles['active']}` : `${styles['navlink']}`}>
                            <MdEventAvailable className={styles['icon']} />
                            Available Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/closed-events" className={({ isActive }) => isActive ? `${styles['navlink']} ${styles['active']}` : `${styles['navlink']}`}>
                            <MdEventBusy className={styles['icon']} />
                            Closed Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-events" className={({ isActive }) => isActive ? `${styles['navlink']} ${styles['active']}` : `${styles['navlink']}`}>
                            <MdEvent className={styles['icon']} />
                            All Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacts" className={({ isActive }) => isActive ? `${styles['navlink']} ${styles['active']}` : `${styles['navlink']}`}>
                            <MdContacts className={styles['icon']} />
                            Contacts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles['navlink']} ${styles['active']}` : `${styles['navlink']}`}>
                            <MdDashboard className={styles['icon']} />
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;