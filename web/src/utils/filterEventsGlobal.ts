import type { EventTableType } from "../types/event";

export const filterEventsGlobal = (
    rows: EventTableType[],
    value: string,
): EventTableType[] => {
    const valueAfterTrim = (value ?? "").trim().toLowerCase();
    if (!valueAfterTrim) return rows;

    return rows.filter(row => {
        const callerName = (row.callerName ?? "").toLowerCase();
        const description = (row.description ?? "").toLowerCase();
        const assignedTeam = (row.assignedTeam ?? "").toLowerCase();
        const city = (row.location.city ?? "").toLowerCase();
        const street = (row.location.street ?? "").toLowerCase();
        const houseNumber = (row.location.houseNumber ?? "").toLowerCase();
        const location = (`${street}, ${city}, ${houseNumber}`).toLowerCase();
        const eventNumber = (row.eventNumber ?? "").toLowerCase();
        return (
            callerName.includes(valueAfterTrim) ||
            description.includes(valueAfterTrim) ||
            assignedTeam.includes(valueAfterTrim) ||
            city.includes(valueAfterTrim) ||
            street.includes(valueAfterTrim) ||
            houseNumber.includes(valueAfterTrim) ||
            location.includes(valueAfterTrim) ||
            eventNumber.includes(valueAfterTrim)
        );
    });
}