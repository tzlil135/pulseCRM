import type { ReactNode } from 'react';
import styles from './FormLabelWrapper.module.css';

type FormLabelWrapperPropsType = {
    children: ReactNode;
}

const CallerNameField = ({ children }: FormLabelWrapperPropsType) => {
    return (
        <>
            <div className={styles["label-wrapp"]}>
                {children}
            </div>
        </>
    )
}

export default CallerNameField;