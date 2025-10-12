import styles from './MenuItems.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';
import { VscRefresh } from 'react-icons/vsc';
import { CiExport } from 'react-icons/ci';
import { BsSortDown } from 'react-icons/bs';

const OpenEventsDM = () => {

    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    }

    const navigate = useNavigate();

    const handleAddEvent = () => {
        navigate('/add-event');
    };


    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li >
                        <button className={styles['menu-button']} onClick={handleAddEvent}>
                            <span>Add</span>
                            <span className={styles['icon-margin']}><IoAddSharp /></span>
                        </button>
                    </li>
                    <li
                        className={activeButton === 'refresh' ? styles['active'] : ''}
                        onClick={() => handleButtonClick('refresh')}>
                        <button className={styles['menu-button']}>
                            <span>Refresh</span>
                            <span className={styles['icon-margin']}><VscRefresh /></span>
                        </button>
                    </li>
                    <li
                        className={activeButton === 'export' ? styles['active'] : ''}
                        onClick={() => handleButtonClick('export')}>
                        <button className={styles['menu-button']}>
                            <span>Export</span>
                            <span className={styles['icon-margin']}><CiExport /></span>
                        </button>
                    </li>
                    <li
                        className={activeButton === 'sort' ? styles['active'] : ''}
                        onClick={() => handleButtonClick('sort')}>
                        <button className={styles['menu-button']}>
                            <span>Sort</span>
                            <span className={styles['icon-margin']}><BsSortDown /></span>
                        </button>
                    </li>
                </ul>
                <div className={styles['navbar-right']}>
                    <div className={styles['search-container']}>
                        <label htmlFor="">Filter</label>
                        <input type="text" placeholder="Filter by keyword..." />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OpenEventsDM;