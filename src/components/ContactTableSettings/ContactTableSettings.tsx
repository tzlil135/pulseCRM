import styles from './ContactTableSettings.module.css';
import toast, { Toaster } from 'react-hot-toast';
import type { Dispatch, SetStateAction } from 'react';
import type { ZebraColor } from '../../Pages/Contacts/Contacts';

type ContactTableSettingsProps = {
    isColumnResizingEnabled: boolean;
    setIsColumnResizingEnabled: (value: boolean) => void;

    isZebraStripingEnabled: boolean;
    setIsZebraStripingEnabled: (value: boolean) => void;

    zebraStripingColor: ZebraColor;
    setZebraStripingColor: Dispatch<SetStateAction<ZebraColor>>;

    addressColumnVisible: boolean;
    setAddressColumnVisible: (value: boolean) => void;

    emailColumnVisible: boolean;
    setEmailColumnVisible: (value: boolean) => void;

    phoneColumnVisible: boolean;
    setPhoneColumnVisible: (value: boolean) => void;

    companyColumnVisible: boolean;
    setCompanyColumnVisible: (value: boolean) => void;

    onCancel: () => void;
};

const ContactTableSettings = ({
    isColumnResizingEnabled,
    setIsColumnResizingEnabled,

    isZebraStripingEnabled,
    setIsZebraStripingEnabled,

    zebraStripingColor,
    setZebraStripingColor,

    addressColumnVisible,
    setAddressColumnVisible,

    emailColumnVisible,
    setEmailColumnVisible,

    phoneColumnVisible,
    setPhoneColumnVisible,

    companyColumnVisible,
    setCompanyColumnVisible,

    onCancel,
}: ContactTableSettingsProps) => {

    const handleSave = () => {
        localStorage.setItem('contactTableSettings', JSON.stringify({
            isColumnResizingEnabled,
            isZebraStripingEnabled,
            zebraStripingColor,
            addressColumnVisible,
            emailColumnVisible,
            phoneColumnVisible,
            companyColumnVisible
        }));
        toast.success('Settings saved');
    }

    return (
        <form className={styles['form-container']} onSubmit={e => e.preventDefault()}>
            <Toaster />
            <div className={styles['form-content']}>
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        <input
                            type="checkbox"
                            checked={isColumnResizingEnabled}
                            onChange={e => setIsColumnResizingEnabled(e.target.checked)}
                        />
                        <span>Enable column resizing</span>
                    </label>
                </div>

                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        <input
                            type="checkbox"
                            checked={isZebraStripingEnabled}
                            onChange={e => setIsZebraStripingEnabled(e.target.checked)}
                        />
                        <span>Enable zebra striping</span>
                    </label>

                    {isZebraStripingEnabled && (
                        <div className={styles['zebra-striping-options']}>
                            <label
                                className={`${styles['zebra-striping-option']} ${styles['zebra-striping-option--sky-blue']} ${zebraStripingColor === 'sky-blue' ? styles['active-blue'] : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="zebraStripingColor"
                                    checked={zebraStripingColor === 'sky-blue'}
                                    onChange={() => setZebraStripingColor('sky-blue')}
                                />
                                <span>Sky Blue</span>
                            </label>

                            <label
                                className={`${styles['zebra-striping-option']} ${styles['zebra-striping-option--cotton-candy-pink']} ${zebraStripingColor === 'cotton-candy-pink' ? styles['active-pink'] : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="zebraStripingColor"
                                    checked={zebraStripingColor === 'cotton-candy-pink'}
                                    onChange={() => setZebraStripingColor('cotton-candy-pink')}
                                />
                                <span>Cotton Candy Pink</span>
                            </label>

                            <label
                                className={`${styles['zebra-striping-option']} ${styles['zebra-striping-option--light-lemon']} ${zebraStripingColor === 'light-lemon' ? styles['active-yellow'] : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="zebraStripingColor"
                                    checked={zebraStripingColor === 'light-lemon'}
                                    onChange={() => setZebraStripingColor('light-lemon')}
                                />
                                <span>Light Lemon</span>
                            </label>
                        </div>
                    )}
                </div>

                <div className={styles['form-group-columns']}>
                    <span className={styles['form-label-title']}>Manage columns</span>
                    <div className={styles['form-label-columns']}>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={addressColumnVisible}
                                onChange={e => setAddressColumnVisible(e.target.checked)}
                            />
                            <span>Address</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={emailColumnVisible}
                                onChange={e => setEmailColumnVisible(e.target.checked)}
                            />
                            <span>Email</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={phoneColumnVisible}
                                onChange={e => setPhoneColumnVisible(e.target.checked)}
                            />
                            <span>Phone</span>
                        </label>

                        <label className={styles['form-label-column']}>
                            <input
                                type="checkbox"
                                checked={companyColumnVisible}
                                onChange={e => setCompanyColumnVisible(e.target.checked)}
                            />
                            <span>Company</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles['form-actions']}>
                <button
                    type="submit"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button type="button" onClick={onCancel}>Close</button>
            </div>
        </form>
    );
};

export default ContactTableSettings;
