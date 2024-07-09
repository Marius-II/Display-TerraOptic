import React, { useState } from 'react';
import styles from './checkbox-filter.module.css';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    distance: [],
    thicknessReduction: [],
    heliomat: [],
    blueFilter: [],
    visualField: []
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setFilters(prevFilters => {
        const newValues = checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter(item => item !== value);
        return { ...prevFilters, [name]: newValues };
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterHeading}>Distance</h3>
      <div className={styles.filterGroup}>
        {['distanta', 'aproape', 'bifocal', 'progresiv', 'degresiv', 'distanta-aproape'].map(item => (
          <label key={item} className={styles.filterLabel}>
            <input
              type="checkbox"
              name="distance"
              value={item}
              onChange={handleChange}
              className={styles.filterCheckbox}
            />
            {item}
          </label>
        ))}
      </div>

      <h3 className={styles.filterHeading}>Subtiere</h3>
      <div className={styles.filterGroup}>
        {['fara subtiere', 'lite', 'lite+', 'lite++'].map(item => (
          <label key={item} className={styles.filterLabel}>
            <input
              type="checkbox"
              name="thicknessReduction"
              value={item}
              onChange={handleChange}
              className={styles.filterCheckbox}
            />
            {item}
          </label>
        ))}
      </div>

      <h3 className={styles.filterHeading}>Heliomat</h3>
      <div className={styles.filterGroup}>
        {['fara heliomat', 'clasic', 'avansat', 'expert'].map(item => (
          <label key={item} className={styles.filterLabel}>
            <input
              type="checkbox"
              name="heliomat"
              value={item}
              onChange={handleChange}
              className={styles.filterCheckbox}
            />
            {item}
          </label>
        ))}
      </div>

      <h3 className={styles.filterHeading}>Filtru lumina albastra</h3>
      <div className={styles.filterGroup}>
        {['fara filtru lumina albastra', 'emerald', 'emerald blue', 'blue'].map(item => (
          <label key={item} className={styles.filterLabel}>
            <input
              type="checkbox"
              name="blueFilter"
              value={item}
              onChange={handleChange}
              className={styles.filterCheckbox}
            />
            {item}
          </label>
        ))}
      </div>

      <h3 className={styles.filterHeading}>Camp vizual</h3>
      <div className={styles.filterGroup}>
        {['mic', 'medium', 'mare'].map(item => (
          <label key={item} className={styles.filterLabel}>
            <input
              type="checkbox"
              name="visualField"
              value={item}
              onChange={handleChange}
              className={styles.filterCheckbox}
            />
            {item}
          </label>
        ))}
      </div>

      <h3 className={styles.filterHeading}>Price</h3>
      <div className={styles.filterGroup}>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          className={styles.filterInput}
        />
      </div>

      <button onClick={handleApplyFilters} className={styles.applyButton}>Apply Filters</button>
    </div>
  );
};

export default FilterComponent;
