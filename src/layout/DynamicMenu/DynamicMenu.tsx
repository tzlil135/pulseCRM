import styles from './menuItems/MenuItems.module.css';
import { useLocation } from 'react-router-dom';
import OpenEventsDM from './menuItems/OpenEventsDM';
import ClosedEventsDM from './menuItems/ClosedEventsDM';
import AllEventsDM from './menuItems/AllEventsDM';
import ContactsDM from './menuItems/ContactsDM';
import DashboardDM from './menuItems/DashboardDM';
import AddEventsDM from './menuItems/AddEventDM';
import AddContactDM from './menuItems/AddContactDM';
import ContactDM from './menuItems/ContactDM';

const DynamicMenu = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <nav className={styles['navbar-container']}>
                {path === '/' && (
                    <OpenEventsDM />
                )}
                {path === '/closed-events' && (
                    <ClosedEventsDM />
                )}
                {path === '/all-events' && (
                    <AllEventsDM />
                )}
                {path === '/contacts' && (
                    <ContactsDM />
                )}
                {path === '/dashboard' && (
                    <DashboardDM />
                )}
                {path === '/add-event' && (
                    <AddEventsDM />
                )}
                {path === '/add-contact' && (
                    <AddContactDM />
                )}
                {path.startsWith('/contacts/') && (
                    <ContactDM />
                )}
            </nav>

        </>
    )
}

export default DynamicMenu;