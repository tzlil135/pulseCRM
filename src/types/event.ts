import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type EventStatus = 'opened' | 'closed' | 'in-progress' | 'overdue';

export type EventType = {
    id: string;
    callerName: string;
    callerDetails: {
        phone: string;
        email: string;
        location: {
            city: string;
            street: string;
            houseNumber: string;
        };
    }
    status: EventStatus;
    startTime: string;
    endTime: string;
    description: string;
    location: {
        city: string;
        street: string;
        houseNumber: string;
    };
    assignedTeam: string;
    subject: string;
    subSubject: string;
    createdBy: string;
    timeLine: string[];
    resolvation?: string;
}

export type NewEventType = {
    callerName: string;
    description: string;
    address?: string;
    location: {
        city: string;
        street: string;
        houseNumber: string;
    };
    assignedTeam: string;
    subject: string;
    subSubject: string;
    resolvation?: string;
}

export type NewEventFormFieldsPropsType = {
    register: UseFormRegister<NewEventType>;
    errors: FieldErrors<NewEventType>;
}