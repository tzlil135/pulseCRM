import type { NewClientType, ClientType } from "../types/client";

export const addContact = (contact: NewClientType) => {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

    const contactWithId: ClientType = {
        ...contact,
        id: Date.now().toString() + Math.floor(Math.random() * 1000).toString()
    };

    contacts.push(contactWithId);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

export const getContacts = (): ClientType[] => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

export const getContactById = (id: string): ClientType | undefined => {
    try {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        const contact = contacts.find((c: ClientType) => c.id === id);
        return contact;
    } catch (error) {
        console.error("Error getting contact by ID:", error);
        return undefined;
    }
};