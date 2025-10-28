export interface ContactInput {
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
    company?: string;
    position?: string;
    notes?: string;
}