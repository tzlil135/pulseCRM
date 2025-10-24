import { find, findById, create, update, remove } from "../models/contactsDataAccessService";

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

export const createContact = async (contact: any) => {
    try {
        const newContact = await create(contact);
        return Promise.resolve(newContact);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateContact = async (id: string, contact: any) => {
    try {
        const updatedContact = await update(id, contact);
        return Promise.resolve(updatedContact);
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
