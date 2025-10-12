import type { NewClientType, ClientType } from "../types/client";
import type { NewEventType, EventType } from "../types/event";

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

export const addEvent = (event: NewEventType) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');

    const eventWithId: EventType = {
        ...event,
        id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
        callerDetails: {
            phone: '',
            email: '',
            location: {
                city: '',
                street: '',
                houseNumber: '',
            }
        },
        startTime: new Date().toISOString(),
        endTime: '',
        createdBy: '',
        status: 'opened',
        timeLine: []
    };

    events.push(eventWithId);
    localStorage.setItem('events', JSON.stringify(events));
}

export const getEvents = (): EventType[] => {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
};
