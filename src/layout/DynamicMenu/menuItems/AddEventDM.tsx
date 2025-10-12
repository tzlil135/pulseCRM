import styles from './MenuItems.module.css';
import { CiSaveDown2 } from 'react-icons/ci';
import { HiSave } from 'react-icons/hi';
import { BsDoorClosed } from 'react-icons/bs';
import { HiMiniDocumentDuplicate } from 'react-icons/hi2';
import { useFormSubmitContext } from '../../../contexts/FormSubmitContext';

const AddEventsDM = () => {

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
                            <span className={styles['icon-margin']}><BsDoorClosed /></span>
                        </button>
                    </li>
                    <li>
                        <button className={styles['menu-button']}>
                            <span>Save & Duplicate</span>
                            <span className={styles['icon-margin']}><HiMiniDocumentDuplicate /></span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default AddEventsDM;