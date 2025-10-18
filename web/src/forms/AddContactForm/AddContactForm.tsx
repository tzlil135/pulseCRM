import type { NewClientType } from "../../types/client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { addContactSchema } from "../../validations/addContactSchema";
import styles from './AddContactForm.module.css';
import NameField from "./AddContactFormFields/NameField";
import ContactsField from "./AddContactFormFields/ContactsField";
import EmploymentDetailsField from "./AddContactFormFields/EmploymentDetails";
import CallerLocationField from "./AddContactFormFields/CallerLocationfield";
import toast, { Toaster } from "react-hot-toast";
import { useFormSubmitContext } from "../../contexts/FormSubmitContext";
import { useEffect } from "react";
import { addContact } from "../../service/contactService";

const AddContactForm = () => {

    const { setSubmitFormFn } = useFormSubmitContext();

    const { register, handleSubmit, formState: { errors } } = useForm<NewClientType>(
        {
            defaultValues: {
                name: {
                    firstName: '',
                    middleName: '',
                    lastName: ''
                },
                email: '',
                phone: '',
                officePhone: '',
                address: {
                    street: '',
                    city: '',
                    houseNumber: ''
                },
                company: '',
                position: '',
                notes: ''
            },
            mode: 'onChange',
            resolver: joiResolver(
                addContactSchema
            )
        }
    );

    useEffect(() => {
        const onSubmit = (data: NewClientType) => {
            console.log("Inside onSubmit");
            console.log(data);
            toast.success("Contact added successfully!");
            addContact(data); // Call the service to add the contact
        };

        const submitFunction = handleSubmit(onSubmit);

        setSubmitFormFn(submitFunction);
    }, [setSubmitFormFn, handleSubmit]);


    return (
        <>
            <Toaster />
            <div className={styles['form-container']}>
                <h3>New Contact</h3>
                <form className={styles['form-content']} action="">
                    <div className={styles['form-field']}>
                        <NameField
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className={styles['form-field']}>
                        <ContactsField
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className={styles['form-field']}>
                        <CallerLocationField
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className={styles['form-field']}>
                        <EmploymentDetailsField
                            register={register}
                            errors={errors}
                        />
                    </div>
                </form>
            </div >
        </>
    )
}

export default AddContactForm;