import styles from './MenuItems.module.css';
import { CiSaveDown2 } from 'react-icons/ci';
import { HiSave } from 'react-icons/hi';
import { FaBookOpen } from 'react-icons/fa6';
import { MdAddTask } from 'react-icons/md';
import { useFormSubmitContext } from '../../../contexts/FormSubmitContext';

const AddContactDM = () => {

    const { submitForm } = useFormSubmitContext();

    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li>
                        <button onClick={submitForm} className={styles['menu-button']}>
                            <span>Save</span>
                            <span className={styles['icon-margin']}><CiSaveDown2 /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Save & Close</span>
                            <span className={styles['icon-margin']}><HiSave /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Save & Open</span>
                            <span className={styles['icon-margin']}><FaBookOpen /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Save & Add Task</span>
                            <span className={styles['icon-margin']}><MdAddTask /></span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default AddContactDM;