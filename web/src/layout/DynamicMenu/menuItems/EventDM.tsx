import { CiSaveDown2 } from 'react-icons/ci';
import styles from '../menuItems/MenuItems.module.css';
import { IoMdDoneAll } from 'react-icons/io';
import { TbGitBranch } from "react-icons/tb";
import { useFormSubmitContext } from "../../../contexts/FormSubmitContext"
import { GoIssueReopened } from "react-icons/go";

const EventDM = () => {

    const { submitForm, resolveEventFn, isEventReadOnly, createChildEventFn } = useFormSubmitContext();

    const handleSave = () => {
        if (submitForm && !isEventReadOnly) {
            submitForm();
        }
    };

    const handleResolve = () => {
        if (resolveEventFn) {
            resolveEventFn();
        }
    };

    const isResolved = !!isEventReadOnly;

    return (
        <>
            <div className={styles['navbar-list']}>
                <ul className={styles['navbar-left']}>
                    <li >
                        <button
                            type="button"
                            className={styles['menu-button']}
                            onClick={handleSave}
                            disabled={isEventReadOnly}
                        >
                            <span>Save</span>
                            <span className={styles['icon-margin']}><CiSaveDown2 /></span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={styles['menu-button']}
                            onClick={handleResolve}
                        >
                            <span>{isResolved ? "Reopen" : "Resolve"}</span>
                            <span className={styles['icon-margin']}>
                                {isResolved ? <GoIssueReopened /> : <IoMdDoneAll />}
                            </span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={styles['menu-button']}
                            onClick={createChildEventFn}
                        >
                            <span>Create Child Event</span>
                            <span className={styles['icon-margin']}><TbGitBranch /></span>
                        </button>
                    </li>
                </ul>
                {
                    isResolved && (
                        <div className={styles['resolved-badge']}>
                            <span>Resolved</span>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default EventDM;