import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type EventType = {
    id: string;
    eventNumber: string;
    callerName: string;
    callerDetails?: {
        phone: string;
        email: string;
        location: {
            city: string;
            street: string;
            houseNumber: string;
        };
    }
    status: 'open' | 'closed' | 'in-progress' | 'overdue';
    startTime: string;
    endTime?: string;
    description: string;
    location: {
        city: string;
        street: string;
        houseNumber: string;
    };
    assignedTeam: string;
    subject: string;
    subSubject?: string;
    createdBy?: string;
    timeLine?: {
        timestamp: string;
        user: string;
        action: string;
    }[];
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

export type EventTableType = {
    eventNumber: string;
    callerName: string;
    description: string;
    assignedTeam: string;
    location: string;
    id: string;
    status: string;
}