import type { EventTableType } from '../types/event';
import type { FilterType } from '../types/fitchers';

const norm = (v: unknown) => (v ?? '').toString().toLowerCase().trim();

export const filterEvents = (
    rows: EventTableType[],
    activeFilter: { [column: string]: FilterType | null }
): EventTableType[] => {

    if (!activeFilter || Object.keys(activeFilter).length === 0) return rows;

    return rows.filter(row =>
        Object.entries(activeFilter).every(([column, filter]) => {
            if (!filter || !filter.value || !filter.value.trim()) return true;

            const q = norm(filter.value);

            let field: string = '';
            switch (column) {
                case 'eventNumber': field = norm(row.eventNumber); break;
                case 'callerName': field = norm(row.callerName); break;
                case 'description': field = norm(row.description); break;
                case 'assignedTeam': field = norm(row.assignedTeam); break;
                case 'location':
                    field = norm(
                        `${row.location.street}, ${row.location.city}, ${row.location.houseNumber}`
                    );
                    break;
                case 'status': field = norm(row.status); break;
                default:
                    field = norm((row as any)[column]);
            }

            if (filter.mode === 'equals') return field === q;
            return field.includes(q);
        })
    );
};