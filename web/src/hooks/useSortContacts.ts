import type { ContactTableType } from "../types/client";

export const sortContacts = (
    arr: ContactTableType[],
    sortBy: keyof ContactTableType | null,
    isAsc: boolean
): ContactTableType[] => {
    if (!sortBy) return arr;

    return [...arr].sort((a, b) => {
        let valA: any;
        let valB: any;

        if (sortBy === 'name') {
            valA = `${a.name.firstName} ${a.name.lastName}`.toLowerCase();
            valB = `${b.name.firstName} ${b.name.lastName}`.toLowerCase();
        } else if (sortBy === 'address') {
            valA = `${a.address.street} ${a.address.city} ${a.address.houseNumber}`.toLowerCase();
            valB = `${b.address.street} ${b.address.city} ${b.address.houseNumber}`.toLowerCase();
        } else {
            valA = a[sortBy];
            valB = b[sortBy];
        }

        if (valA === valB) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;

        if (typeof valA === 'string' && typeof valB === 'string') {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return isAsc ? (valA > valB ? 1 : -1) : (valA > valB ? -1 : 1);
    });
}
