import { find } from "../models/contactsDataAccessService";

export const getContacts = async () => {
    try {
        const contacts = await find();
        return Promise.resolve(contacts);
    } catch (error) {
        return Promise.reject(error);
    }
};

