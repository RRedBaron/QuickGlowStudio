import {useState} from "react";
import styles from "./FilterRow.module.css"

interface FilterRowProps {
    onFilter: (filter: object) => void;
}

function FilterRow({onFilter}: FilterRowProps) {
    const [createdAtFilter, setCreatedAtFilter] = useState('');
    const [reservedDateFilter, setReservedDateFilter] = useState('');
    const [sessionTypeFilter, setSessionTypeFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');

    const handleFilter = () => {
        onFilter({
            createdAt: createdAtFilter,
            reservedDate: reservedDateFilter,
            sessionType: sessionTypeFilter,
            price: priceFilter,
        });
    };

    const handleReset = () => {
        setCreatedAtFilter('');
        setReservedDateFilter('');
        setSessionTypeFilter('');
        setPriceFilter('');
        onFilter({});
    };

    return (
        <div className={styles.filterRow}>
            <span className={styles.filterRowTitle}>Filter by:</span>
            <div className={styles.filterSelectWrapper}>
                <div className={styles.filterRowSelectWrapper}>
                    <div className={styles.filterRowCell}>
                        <select
                            className={styles.filterRowSelect}
                            value={createdAtFilter}
                            onChange={(e) => setCreatedAtFilter(e.target.value)}
                        >
                            <option value="">Created at</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className={styles.filterRowCell}>
                        <select
                            className={styles.filterRowSelect}
                            value={reservedDateFilter}
                            onChange={(e) => setReservedDateFilter(e.target.value)}
                        >
                            <option value="">Reserved Date</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className={styles.filterRowCell}>
                        <select
                            className={styles.filterRowSelect}
                            value={sessionTypeFilter}
                            onChange={(e) => setSessionTypeFilter(e.target.value)}
                        >
                            <option value="">Type of session</option>
                            <option value="Couple">Couple photography</option>
                            <option value="Family">Family photography</option>
                            <option value="Event">Event photography</option>
                            <option value="Wedding">Wedding photography</option>
                            <option value="Portrait">Portrait photography</option>
                        </select>
                    </div>
                    <div className={styles.filterRowCell}>
                        <select
                            className={styles.filterRowSelect}
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                        >
                            <option value="">Price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
                <div className={styles.filterRowButtonsWrapper}>
                    <button className={styles.filterRowButton} onClick={handleFilter}>
                        Filter
                    </button>
                    <button className={styles.filterRowButton} onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterRow;