import { useState } from 'react';
import styles from './MenuItems.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { CiExport } from 'react-icons/ci';
import { useBackBtn } from '../../../contexts/BackBtn';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';

const ContactDM = () => {

    const { lastListURL } = useBackBtn();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (lastListURL) navigate(lastListURL);
        else if (window.history.length > 1) navigate(-1);
        else navigate('/contacts');
    };

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(prev => !prev);
    };

    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li >
                        <button className={styles['menu-button']} onClick={handleGoBack}>
                            <span>Back</span>
                            <span className={styles['icon-margin']}><IoArrowBack /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']} onClick={handleEdit}>
                            <span>{isEditing ? 'Save' : 'Edit'}</span>
                            <span className={styles['icon-margin']}>{isEditing ? <CiSaveDown2 /> : <FaRegEdit />}</span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Open Event</span>
                            <span className={styles['icon-margin']}><CiExport /></span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );

}

export default ContactDM;