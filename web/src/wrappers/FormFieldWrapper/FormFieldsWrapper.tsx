import styles from './FormFieldsWrapper.module.css';

type FormFieldsWrapperPropsType = {
    children: React.ReactNode;
}

const FormFieldsWrapper = ({ children }: FormFieldsWrapperPropsType) => {
    return (
        <div className={styles['form-fields-wrapper']}>
            {children}
        </div>
    );
}

export default FormFieldsWrapper;