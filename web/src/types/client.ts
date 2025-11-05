import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type NewClientType = {
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    email: string;
    phone: string;
    officePhone?: string;
    address: {
        street: string;
        city: string;
        houseNumber: string;
    };
    company: string;
    position: string;
    notes?: string;
}

export type ClientType = NewClientType & {
    _id: string;
};

export type ClientFormFieldsType = {
    register: UseFormRegister<NewClientType>;
    errors: FieldErrors<NewClientType>;
}

export type Contact = {
    id: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    address: {
        street: string;
        city: string;
        houseNumber: string;
    }
    email: string;
    phone: string;
    company: string;
};

export type ContactTableType = {
    id: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        houseNumber: string;
    };
    company: string;
};