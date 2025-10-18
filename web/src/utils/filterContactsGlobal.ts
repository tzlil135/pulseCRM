import type { ContactTableType } from "../types/client";

export const filterContactsGlobal = (
    rows: ContactTableType[],
    value: string,
): ContactTableType[] => {
    const valueAfterTrim = (value ?? "").trim().toLowerCase();
    if (!valueAfterTrim) return rows;

    return rows.filter(row => {
        const first = (row.name?.firstName ?? "").toLowerCase();
        const middle = (row.name?.middleName ?? "").toLowerCase();
        const last = (row.name?.lastName ?? "").toLowerCase();
        const street = (row.address?.street ?? "").toLowerCase();
        const city = (row.address?.city ?? "").toLowerCase();
        const houseNumber = (row.address?.houseNumber ?? "").toLowerCase();
        const address = (`${street}, ${city}, ${houseNumber}`).toLowerCase();
        const email = (row.email ?? "").toLowerCase();
        const phone = (row.phone ?? "").toLowerCase();
        const company = (row.company ?? "").toLowerCase();
        return (
            first.includes(valueAfterTrim) ||
            middle.includes(valueAfterTrim) ||
            last.includes(valueAfterTrim) ||
            street.includes(valueAfterTrim) ||
            city.includes(valueAfterTrim) ||
            houseNumber.includes(valueAfterTrim) ||
            address.includes(valueAfterTrim) ||
            email.includes(valueAfterTrim) ||
            phone.includes(valueAfterTrim) ||
            company.includes(valueAfterTrim)
        );
    });
}