import { find, findById, create, update, remove } from "../models/contactsDataAccessService";
import validateNewContact from "../validations/contactValidationService";
import { ContactInput } from "../../types/contact";

export const getContacts = async () => {
    const contacts = await find();
    return contacts;
};

export const getContactById = async (id: string) => {
    const contact = await findById(id);
    return contact;
};

export const createContact = async (contact: ContactInput) => {
    try {
        const { error, value } = validateNewContact(contact);
        if (error) {
            const validationError: any = new Error("Validation failed");
            validationError.status = 400;
            throw validationError;
        }
        const newContact = await create(value);
        return newContact;
    } catch (error: any) {
        if (!error.status) {
            error.status = 500;
            error.message = error.message || "Server error";
        }
        throw error;
    }
};

export const updateContact = async (id: string, contact: ContactInput) => {
    try {
        if (!id) {
            const err: any = new Error("ID is required");
            err.status = 400;
            throw err;
        }

        const { error, value } = validateNewContact(contact);

        if (error) {
            const validationError: any = new Error("Validation failed");
            validationError.status = 400;
            throw validationError;
        }

        const updatedContact = await update(id, value);
        return (updatedContact);

    } catch (error: any) {
        if (!error.status) {
            error.status = 500;
            error.message = error.message || "Server error";
        }
        throw error;
    }
};

export const deleteContact = async (id: string) => {
    return await remove(id);
};
