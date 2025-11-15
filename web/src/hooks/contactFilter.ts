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
                const middleName = contact.name.middleName?.toLowerCase() || '';
                const lastName = contact.name.lastName?.toLowerCase() || '';

                if (filter.mode === 'contains') {
                    return (
                        firstName.includes(filterValue) ||
                        middleName.includes(filterValue) ||
                        lastName.includes(filterValue)
                    );
                } else if (filter.mode === 'equals') {
                    return (
                        firstName === filterValue ||
                        middleName === filterValue ||
                        lastName === filterValue
                    );
                }
            } else if (column === 'address') {
                const city = contact.address?.city?.toLowerCase() || '';
                const street = contact.address?.street?.toLowerCase() || '';
                const houseNumber = (contact.address?.houseNumber ?? '').toString().toLowerCase();

                const fullAddress = `${street}, ${city}, ${houseNumber}`.toLowerCase();

                if (filter.mode === 'contains') {
                    return (
                        fullAddress.includes(filterValue) ||
                        city.includes(filterValue) ||
                        street.includes(filterValue) ||
                        houseNumber.includes(filterValue)
                    );
                } else if (filter.mode === 'equals') {
                    return (
                        fullAddress === filterValue ||
                        city === filterValue ||
                        street === filterValue ||
                        houseNumber === filterValue
                    );
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