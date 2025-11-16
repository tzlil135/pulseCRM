import { CiSaveDown2 } from 'react-icons/ci';
import styles from '../menuItems/MenuItems.module.css';
import { IoMdDoneAll } from 'react-icons/io';
import { TbGitBranch } from "react-icons/tb";
import { useFormSubmitContext } from "../../../contexts/FormSubmitContext"

const EventDM = () => {

    const { submitForm } = useFormSubmitContext();

    const handleSave = () => {
        if (submitForm) {
            submitForm();
        }
    };

    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li >
                        <button
                            type="button"
                            className={styles['menu-button']}
                            onClick={handleSave}
                        >
                            <span>Save</span>
                            <span className={styles['icon-margin']}><CiSaveDown2 /></span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={styles['menu-button']}>
                            <span>Resolve</span>
                            <span className={styles['icon-margin']}><IoMdDoneAll /></span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={styles['menu-button']}>
                            <span>Create Child Event</span>
                            <span className={styles['icon-margin']}><TbGitBranch /></span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default EventDM;