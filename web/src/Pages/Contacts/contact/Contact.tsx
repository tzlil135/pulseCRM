import styles from './Contact.module.css';
import { getContactById, updateContact } from '../../../service/contactService';
import { useParams } from 'react-router-dom';
import FormFieldsWrapper from '../../../wrappers/FormFieldWrapper/FormFieldsWrapper';
import FormLabelWrapper from '../../../wrappers/FormLabelWrapper/FormLabelWrapper';
import { useContactEditMode } from '../../../contexts/ContactEditMode';
import { useEffect, useState } from 'react';
import { addContactSchema } from '../../../validations/addContactSchema';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import type { ClientType } from '../../../types/client';

const POSITIONS = [
    "CEO", "Manager", "Team Leader", "Assistant Manager", "Coordinator",
    "Sales Representative", "Customer Service", "Marketing", "Developer",
    "Designer", "Accountant", "HR", "Operations", "Administrator",
    "Technician", "Consultant", "Intern", "Freelancer", "Other"
] as const;

const Contact = () => {

    const { id } = useParams<{ id: string }>();
    const { isEditing, registerOnSave } = useContactEditMode();

    if (!id) {
        return <div>Contact ID is missing</div>;
    }

    const [contact, setContact] = useState<ClientType | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);



    const [form, setForm] = useState({
        name: { firstName: "", middleName: "", lastName: "" },
        email: "",
        phone: "",
        officePhone: "",
        address: { street: "", city: "", houseNumber: "" },
        company: "",
        position: "",
        notes: "",
    });

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const c = await getContactById(id);
                if (cancelled) return;
                setContact(c);
                setForm({
                    name: {
                        firstName: c.name.firstName || "",
                        middleName: c.name.middleName || "",
                        lastName: c.name.lastName || "",
                    },
                    email: c.email || "",
                    phone: c.phone || "",
                    officePhone: c.officePhone || "",
                    address: {
                        street: c.address.street || "",
                        city: c.address.city || "",
                        houseNumber: String(c.address.houseNumber ?? ""),
                    },
                    company: c.company || "",
                    position: c.position || "",
                    notes: c.notes || "",
                });
                setLoadError(null);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load contact");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const formRef = useRef(form);
    useEffect(() => {
        formRef.current = form;
    }, [form]);

    useEffect(() => {
        const handleSave = async () => {
            const f = formRef.current;
            const cleanForm = {
                ...f,
                name: {
                    ...f.name,
                    firstName: f.name.firstName.trim(),
                    middleName: (f.name.middleName ?? "").trim(),
                    lastName: f.name.lastName.trim(),
                },
                address: {
                    ...f.address,
                    street: f.address.street.trim(),
                    city: f.address.city.trim(),
                    houseNumber: f.address.houseNumber.trim(),
                },
                email: f.email.trim(),
                phone: f.phone.trim(),
                officePhone: (f.officePhone ?? "").trim(),
                company: (f.company ?? "").trim(),
                position: (f.position ?? "").trim(),
                notes: (f.notes ?? "").trim(),
            };

            const { error } = addContactSchema.validate(cleanForm, {
                abortEarly: false,
                allowUnknown: true,
            });
            if (error) {
                toast.error(error.details[0].message);
                return false;
            }

            try {
                await updateContact(id, cleanForm);
                toast.success("Contact saved");
                return true;
            } catch (e: any) {
                toast.error(e?.message || "Save failed");
                return false;
            }
        };

        registerOnSave(handleSave);
        return () => registerOnSave(null);
    }, [id, registerOnSave]);

    const fullname = `${form.name.firstName} ${form.name.middleName ? form.name.middleName + " " : ""}${form.name.lastName}`;

    if (loading) return <div>Loading…</div>;
    if (loadError) return <div style={{ color: "crimson" }}>{loadError}</div>;
    if (!contact) return <div>Contact not found</div>;


    return (
        <>
            <div className={styles['form-container']}>
                <h3>{fullname}</h3>
                <form action="" className={styles['form-content']} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles['form-field']}>
                        <FormLabelWrapper>
                            <h4>Contact Name</h4>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="firstName"><span style={{ color: 'red' }}>* </span>First Name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={form.name.firstName}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, name: { ...p.name, firstName: e.target.value } }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="middleName">Middle Name:</label>
                                    <input
                                        type="text"
                                        id="middleName"
                                        value={form.name.middleName || ''}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, name: { ...p.name, middleName: e.target.value } }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="lastName"><span style={{ color: 'red' }}>* </span>Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={form.name.lastName}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, name: { ...p.name, lastName: e.target.value } }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
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
                                        value={form.email}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="phone"><span style={{ color: 'red' }}>* </span>Phone:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={form.phone}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="officePhone">Office Phone:</label>
                                    <input
                                        type="tel"
                                        id="officePhone"
                                        value={form.officePhone || ''}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, officePhone: e.target.value }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
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
                                        value={form.address.street}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, address: { ...p.address, street: e.target.value } }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="city"><span style={{ color: 'red' }}>* </span>City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={form.address.city}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, address: { ...p.address, city: e.target.value } }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="houseNumber"><span style={{ color: 'red' }}>* </span>House Number:</label>
                                    <input
                                        style={{ width: '20%', backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                        type="text"
                                        id="houseNumber"
                                        value={form.address.houseNumber}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, address: { ...p.address, houseNumber: e.target.value } }))}
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
                                        value={form.company || ''}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))}
                                        style={{ backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                    />
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div><label htmlFor="position">Position:</label>
                                    {isEditing ? (
                                        <select
                                            id="position"
                                            value={form.position}
                                            onChange={(e) => setForm(p => ({ ...p, position: e.target.value }))}
                                            style={{
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                                fontSize: '13px',
                                                fontWeight: 'bold',
                                                padding: '5px 10px',
                                                backgroundColor: '#fff'
                                            }}
                                        >
                                            <option value="">Select a position</option>
                                            {POSITIONS.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id="position"
                                            type="text"
                                            value={form.position || ''}
                                            readOnly
                                            style={{ backgroundColor: '#f7f7f7' }}
                                        />
                                    )}
                                </div>
                            </FormFieldsWrapper>
                            <FormFieldsWrapper>
                                <div>
                                    <label htmlFor="notes">Notes:</label>
                                    <textarea
                                        style={{ width: '60%', height: '100px', backgroundColor: isEditing ? '' : '#f7f7f7ff' }}
                                        id="notes"
                                        value={form.notes || ''}
                                        readOnly={!isEditing}
                                        onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))}
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