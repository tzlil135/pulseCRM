import styles from './MenuItems.module.css';
import { CiCalendar } from 'react-icons/ci';
import { FaChartArea } from 'react-icons/fa';
import { SlSocialSteam } from 'react-icons/sl';
import { TbAlertSquareRounded } from 'react-icons/tb';
import { MdOutlineLocationSearching } from 'react-icons/md';


const DashboardDM = () => {
    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Events</span>
                            <span className={styles['icon-margin']}><CiCalendar /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Analytics</span>
                            <span className={styles['icon-margin']}><FaChartArea /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Social</span>
                            <span className={styles['icon-margin']}><SlSocialSteam /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Alerts</span>
                            <span className={styles['icon-margin']}><TbAlertSquareRounded /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Locations</span>
                            <span className={styles['icon-margin']}><MdOutlineLocationSearching /></span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default DashboardDM;