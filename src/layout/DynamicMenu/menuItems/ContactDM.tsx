import styles from './MenuItems.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { CiExport } from 'react-icons/ci';
import { useBackBtn } from '../../../contexts/BackBtn';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';
import { useContactEditMode } from '../../../contexts/ContactEditMode';

const ContactDM = () => {

    const { lastListURL } = useBackBtn();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (lastListURL) navigate(lastListURL);
        else if (window.history.length > 1) navigate(-1);
        else navigate('/contacts');
    };

    const { isEditing, setIsEditing, callOnSave } = useContactEditMode();

    const handleEditOrSave = () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }
        if (typeof callOnSave !== "function") {
            return;
        }
        const ok = callOnSave();
        if (ok) setIsEditing(false);
    };

    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li >
                        <button
                            type="button"
                            className={styles['menu-button']}
                            onClick={handleGoBack}
                            disabled={isEditing}
                            aria-disabled={isEditing}
                            title={isEditing ? "Finish editing to go back" : undefined}
                        >
                            <span>Back</span>
                            <span className={styles['icon-margin']}><IoArrowBack /></span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={styles['menu-button']} onClick={handleEditOrSave}>
                            <span>{isEditing ? 'Save' : 'Edit'}</span>
                            <span className={styles['icon-margin']}>{isEditing ? <CiSaveDown2 /> : <FaRegEdit />}</span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={styles['menu-button']}>
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