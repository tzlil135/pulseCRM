import type { EventTableType, EventType, NewEventType, } from "../types/event";

export const addEvent = (event: NewEventType): EventType => {
    const events: EventType[] = JSON.parse(localStorage.getItem("events") || "[]");
    const currentId = parseInt(localStorage.getItem("eventIdCounter") || "0", 10) || 0;
    localStorage.setItem("eventIdCounter", (currentId + 1).toString());

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const eventNumber = `${String(currentId + 1).padStart(6, "0")}-${month}-${year}`;

    const startTime = new Date().toISOString();

    const id = String(Date.now() * 1000 + Math.floor(Math.random() * 1000));

    const newEvent: EventType = {
        ...event,
        id,
        eventNumber,
        startTime,
        status: 'open',
    };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return newEvent;
};

export const getEvents = (): EventType[] => {
    const events: EventType[] = JSON.parse(localStorage.getItem("events") || "[]");
    return events;
};