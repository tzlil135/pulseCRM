import type { ContactTableType } from '../types/client';
import type { FilterType } from '../types/fitchers';

export const filterContacts = (
    contacts: ContactTableType[],
    activeFilter: { [column: string]: FilterType | null }
) => {
    return contacts.filter(contact => {
        return Object.entries(activeFilter).every(([column, filter]) => {
            // Skip null or undefined filters
            if (!filter) return true;

            // Skip filters with empty values
            if (!filter.value || filter.value.trim() === '') return true;

            const filterValue = filter.value.toLowerCase();

            if (column === 'name') {
                const firstName = contact.name.firstName?.toLowerCase() || '';
                const lastName = contact.name.lastName?.toLowerCase() || '';

                if (filter.mode === 'contains') {
                    return firstName.includes(filterValue) || lastName.includes(filterValue);
                } else if (filter.mode === 'equals') {
                    return firstName === filterValue || lastName === filterValue;
                }
            } else if (column === 'address') {
                const city = contact.address?.city?.toLowerCase() || '';
                const street = contact.address?.street?.toLowerCase() || '';
                const houseNumber = contact.address?.houseNumber?.toString() || '';

                if (filter.mode === 'contains') {
                    return city.includes(filterValue) || street.includes(filterValue) || houseNumber.includes(filterValue);
                } else if (filter.mode === 'equals') {
                    return city === filterValue || street === filterValue || houseNumber === filterValue;
                }
            } else {
                const contactValue = (contact as any)[column];
                if (typeof contactValue !== 'string') return true;

                if (filter.mode === 'contains') {
                    return contactValue.toLowerCase().includes(filterValue);
                } else if (filter.mode === 'equals') {
                    return contactValue.toLowerCase() === filterValue;
                }
            }

            return true;
        });
    });
};