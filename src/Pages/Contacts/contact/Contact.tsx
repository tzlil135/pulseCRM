import styles from './Contact.module.css';
import { getContactById } from '../../../service/contactService';
import { useParams } from 'react-router-dom';
import FormFieldsWrapper from '../../../wrappers/FormFieldWrapper/FormFieldsWrapper';
import FormLabelWrapper from '../../../wrappers/FormLabelWrapper/FormLabelWrapper';

const Contact = () => {

    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>Contact ID is missing</div>;
    }
    const contact = getContactById(id);
    if (!contact) {
        return <div>Contact not found</div>;
    }

    const isEditing = true; // Set to true if you want to enable editing


    const fullname = `${contact.name.firstName} ${contact.name.middleName ? contact.name.middleName + ' ' : ''}${contact.name.lastName}`;

    return (
        <>
            <div className={styles['form-container']}>
                <h3>{fullname}</h3>
                <form action="" className={styles['form-content']}>
                    <div className={styles['form-field']}>
                        <FormLabelWrapper>
                            <h4>Contact Name</h4>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="firstName"><span style={{ color: 'red' }}>* </span>First Name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={contact.name.firstName}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="middleName">Middle Name:</label>
                                    <input
                                        type="text"
                                        id="middleName"
                                        value={contact.name.middleName || ''}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="lastName"><span style={{ color: 'red' }}>* </span>Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={contact.name.lastName}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                        </FormLabelWrapper>
                    </div>
                    <div className={styles['form-field']}>
                        <FormLabelWrapper>
                            <h4>Contact Details</h4>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="email"><span style={{ color: 'red' }}>* </span>Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={contact.email}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="phone"><span style={{ color: 'red' }}>* </span>Phone:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={contact.phone}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="officePhone">Office Phone:</label>
                                    <input
                                        type="tel"
                                        id="officePhone"
                                        value={contact.officePhone || ''}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                        </FormLabelWrapper>
                    </div>
                    <div className={styles['form-field']}>
                        <FormLabelWrapper>
                            <h4>Contact Location</h4>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="street"><span style={{ color: 'red' }}>* </span>Street:</label>
                                    <input
                                        type="text"
                                        id="street"
                                        value={contact.address.street}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="city"><span style={{ color: 'red' }}>* </span>City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={contact.address.city}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="houseNumber"><span style={{ color: 'red' }}>* </span>House Number:</label>
                                    <input
                                        style={{ width: '20%', backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                        type="text"
                                        id="houseNumber"
                                        value={contact.address.houseNumber}
                                        readOnly
                                    />
                                </div>
                            </FormFieldsWrapper>
                        </FormLabelWrapper>
                    </div>
                    <div className={styles['form-field']}>
                        <FormLabelWrapper>
                            <h4>Employment Details</h4>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="company">Company:</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={contact.company || ''}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div><label htmlFor="position">Position:</label>
                                    <input
                                        type="text"
                                        id="position"
                                        value={contact.position || ''}
                                        readOnly
                                        style={{ backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="notes">Notes:</label>
                                    <textarea
                                        style={{ width: '60%', height: '100px', backgroundColor: isEditing ? '#f7f7f7ff' : '' }}
                                        id="notes"
                                        value={contact.notes || ''}
                                        readOnly
                                    />
                                </div>
                            </FormFieldsWrapper>
                        </FormLabelWrapper>
                    </div>
                </form >
            </div >
        </>
    )
}

export default Contact;