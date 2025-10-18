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

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

/** בעדכון לא משנים id */
export type ContactPatch = DeepPartial<Omit<ClientType, "id">>;

export const updateContact = (id: string, patch: ContactPatch): ClientType | null => {
    try {
        const contacts = getContacts();
        const idx = contacts.findIndex(c => c.id === id);
        if (idx === -1) return null;

        const current = contacts[idx];

        const merged: ClientType = {
            ...current,
            ...patch,
            name: { ...current.name, ...(patch.name ?? {}) },
            address: { ...current.address, ...(patch.address ?? {}) }, // houseNumber נשאר string
        };

        contacts[idx] = merged;
        localStorage.setItem("contacts", JSON.stringify(contacts));
        return merged;
    } catch (e) {
        console.error("updateContact error:", e);
        return null;
    }
};