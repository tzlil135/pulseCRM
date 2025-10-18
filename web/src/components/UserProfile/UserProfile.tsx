import styles from './UserProfile.module.css';
import { IoSettingsOutline } from "react-icons/io5";

const UserProfile = () => {
    return (
        <>
            <div className={styles['user-profile-container']}>
                <button className={styles['profile-button']}>
                    <span>TC</span>
                </button>
                <button className={styles['settings-button']}>
                    <IoSettingsOutline />
                </button>
            </div>
        </>
    )
}

export default UserProfile;