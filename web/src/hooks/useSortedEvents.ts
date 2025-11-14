import type { EventTableType } from "../types/event";

export const sortEvents = (
    arr: EventTableType[],
    sortBy: keyof EventTableType | null,
    isAsc: boolean
): EventTableType[] => {
    if (!sortBy) return arr;

    return [...arr].sort((a, b) => {
        let valA: any;
        let valB: any;

        if (sortBy === "location") {
            valA = `${a.location.street} ${a.location.city} ${a.location.houseNumber}`.toLowerCase();
            valB = `${b.location.street} ${b.location.city} ${b.location.houseNumber}`.toLowerCase();
        } else {
            valA = (a as any)[sortBy];
            valB = (b as any)[sortBy];
        }

        if (valA === valB) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;

        if (typeof valA === "string" && typeof valB === "string") {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return isAsc ? (valA > valB ? 1 : -1) : (valA > valB ? -1 : 1);
    });
};
