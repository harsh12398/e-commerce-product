import React from 'react';
import styles from '../styles/FilterBar.module.css';

const FilterBar = ({
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    categories,
    onClear
}) => {
    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.search}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat.slug || cat} value={cat.slug || cat}>
                        {cat.name || cat}
                    </option>
                ))}
            </select>

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={styles.select}
            >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>

            <button onClick={onClear} className={styles.clearButton}>
                Clear Filters
            </button>
        </div>
    );
};

export default FilterBar;
