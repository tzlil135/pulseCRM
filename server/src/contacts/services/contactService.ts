import { find, findById, create, update, remove } from "../models/contactsDataAccessService";
import validateNewContact from "../validations/contactValidationService";
import { ContactInput } from "../../types/contact";

export const getContacts = async () => {
    try {
        const contacts = await find();
        return Promise.resolve(contacts);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getContactById = async (id: string) => {
    try {
        const contact = await findById(id);
        return Promise.resolve(contact);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createContact = async (contact: ContactInput) => {
    try {
        const { error, value } = validateNewContact(contact);
        if (error) {
            const validationError: any = new Error("Validation failed");
            validationError.status = 400;
            validationError.messages = error.details.map((d) => d.message);
            throw validationError;
        }
        const newContact = await create(value);
        return (newContact);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateContact = async (id: string, contact: ContactInput) => {
    try {
        const { error, value } = validateNewContact(contact);
        if (error) {
            const validationError: any = new Error("Validation failed");
            validationError.status = 400;
            validationError.messages = error.details.map((d) => d.message);
            throw validationError;
        }
        const updatedContact = await update(id, value);
        return (updatedContact);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteContact = async (id: string) => {
    try {
        const deletedContact = await remove(id);
        return Promise.resolve(deletedContact);
    } catch (error) {
        return Promise.reject(error);
    }
};
