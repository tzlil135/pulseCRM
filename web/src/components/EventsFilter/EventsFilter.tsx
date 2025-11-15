import styles from './EventsFilter.module.css';
import type { FilterType } from '../../types/fitchers';

type EventFilterProps = {
    filter: FilterType | null;
    onChangeMode: (mode: 'contains' | 'equals') => void;
    onChangeValue: (value: string) => void;
    onApply: () => void;
    column: string;
}


const EventFilter = ({ filter, onChangeMode, onChangeValue, onApply, column }: EventFilterProps) => {
    return (

        <>
            <form action="" className={styles['contact-filter']} onSubmit={e => {
                e.preventDefault();
                onApply();
            }}>
                <div className={styles['filter-label-container']}>
                    <label htmlFor="">Filter by <span style={{ fontWeight: 'bold' }}>{column}</span>:</label>
                    <select
                        value={filter?.mode || 'contains'}
                        onChange={e => onChangeMode(e.target.value as 'contains' | 'equals')}>
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                    </select>
                </div>
                <div className={styles['filter-label-container']}>
                    <label htmlFor="">Value:</label>
                    <input
                        type="text"
                        value={filter?.value || ''}
                        onChange={e => onChangeValue(e.target.value)}
                        placeholder="Type to filter..."
                    />
                </div>

            </form>
        </>
    );
};

export default EventFilter;