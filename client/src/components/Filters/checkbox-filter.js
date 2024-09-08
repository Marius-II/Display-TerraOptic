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
  
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (type === 'checkbox') {
        if (checked) {
          // Only add the value if it doesn't already exist in the array
          if (!prevFilters[name].includes(value)) {
            newFilters[name] = [...prevFilters[name], value];
          }
        } else {
          // Remove the value from the array if unchecked
          newFilters[name] = prevFilters[name].filter(item => item !== value);
        }
      } else {
        newFilters[name] = value;
      }
      return newFilters;
    });
  };
  
  const heliomatMapping = {
    'fara heliomat': 0,
    'clasic': 30,
    'avansat': 60,
    'expert': 90
  };
  
  const blueFilterMapping = {
    'fara filtru lumina albastra': 0,
    'emerald': 30,
    'emerald blue': 60,
    'blue': 90
  };
  
  const thicknessReductionMapping = {
    'fara subtiere': 0,
    'lite': 30,
    'lite+': 60,
    'lite++': 90
  };
  

  const handleApplyFilters = () => {
    const activeFilters = { ...filters };
  
    // Clear irrelevant filters based on distance selection
    if (filters.distance.length === 0) {
      activeFilters.thicknessReduction = [];
      activeFilters.heliomat = [];
      activeFilters.blueFilter = [];
      activeFilters.visualField = [];
    } else {
      // Convert heliomat values to numbers
      if (activeFilters.heliomat.length > 0) {
        activeFilters.heliomat = activeFilters.heliomat.map(value => heliomatMapping[value] ?? value);
      }
  
      // Convert blueFilter values to numbers
      if (activeFilters.blueFilter.length > 0) {
        activeFilters.blueFilter = activeFilters.blueFilter.map(value => blueFilterMapping[value] ?? value);
      }
  
      // Convert thicknessReduction values to numbers
      if (activeFilters.thicknessReduction.length > 0) {
        activeFilters.thicknessReduction = activeFilters.thicknessReduction.map(value => thicknessReductionMapping[value] ?? value);
      }
    }
  
    console.log('Applying Filters with numeric values:', activeFilters);
    onFilterChange(activeFilters);
  };
  

  const isNothingSelected = () => filters.distance.length === 0;
  const isStandardSelected = () => filters.distance.some(value => ['distanta', 'aproape', 'distanta-aproape', 'progresiv'].includes(value));
  const isBifocalSelected = () => filters.distance.includes('bifocal');
  const isLentileSpecialeSelected = () => filters.distance.includes('lentile speciale');
  const isDegresivSelected = () => filters.distance.includes('degresiv');

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterHeading}>Distance</h3>
      <div className={styles.filterGroup}>
        {['distanta', 'aproape', 'bifocal', 'progresiv', 'degresiv', 'distanta-aproape', 'lentile speciale'].map(item => (
          <label key={item} htmlFor={`distance-${item}`} className={styles.filterLabel}>
            <input
              type="checkbox"
              id={`distance-${item}`}
              name="distance"
              value={item}
              onChange={handleChange}
              className={styles.filterCheckbox}
            />
            {item}
          </label>
        ))}
      </div>

      {isStandardSelected() && (
        <>
          <h3 className={styles.filterHeading}>Subtiere</h3>
          <div className={styles.filterGroup}>
            {['fara subtiere', 'lite', 'lite+', 'lite++'].map(item => (
              <label key={item} htmlFor={`thicknessReduction-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`thicknessReduction-${item}`}
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
              <label key={item} htmlFor={`heliomat-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`heliomat-${item}`}
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
              <label key={item} htmlFor={`blueFilter-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`blueFilter-${item}`}
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
              <label key={item} htmlFor={`visualField-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`visualField-${item}`}
                  name="visualField"
                  value={item}
                  onChange={handleChange}
                  className={styles.filterCheckbox}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}

      {isBifocalSelected() && (
        <>
          <h3 className={styles.filterHeading}>Subtiere</h3>
          <div className={styles.filterGroup}>
            {['fara subtiere', 'lite'].map(item => (
              <label key={item} htmlFor={`thicknessReduction-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`thicknessReduction-${item}`}
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
            {['fara heliomat', 'clasic'].map(item => (
              <label key={item} htmlFor={`heliomat-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`heliomat-${item}`}
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
            {['blue'].map(item => (
              <label key={item} htmlFor={`blueFilter-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`blueFilter-${item}`}
                  name="blueFilter"
                  value={item}
                  onChange={handleChange}
                  className={styles.filterCheckbox}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}

      {isLentileSpecialeSelected() && (
        <>
          <h3 className={styles.filterHeading}>Subtiere</h3>
          <div className={styles.filterGroup}>
            {['fara subtiere', 'lite', 'lite+'].map(item => (
              <label key={item} htmlFor={`thicknessReduction-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`thicknessReduction-${item}`}
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
            {['fara heliomat', 'clasic'].map(item => (
              <label key={item} htmlFor={`heliomat-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`heliomat-${item}`}
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
            {['fara filtru lumina albastra', 'blue', 'emerald blue'].map(item => (
              <label key={item} htmlFor={`blueFilter-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`blueFilter-${item}`}
                  name="blueFilter"
                  value={item}
                  onChange={handleChange}
                  className={styles.filterCheckbox}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}

      {isDegresivSelected() && (
        <>
          <h3 className={styles.filterHeading}>Subtiere</h3>
          <div className={styles.filterGroup}>
            {['fara subtiere', 'lite'].map(item => (
              <label key={item} htmlFor={`thicknessReduction-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`thicknessReduction-${item}`}
                  name="thicknessReduction"
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
            {['blue', 'emerald blue'].map(item => (
              <label key={item} htmlFor={`blueFilter-${item}`} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  id={`blueFilter-${item}`}
                  name="blueFilter"
                  value={item}
                  onChange={handleChange}
                  className={styles.filterCheckbox}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}

      {!isNothingSelected() && (
        <>
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

          <button 
            onClick={handleApplyFilters} 
            className={styles.applyButton}
          >
            Apply Filters
          </button>
        </>
      )}
    </div>
  );
};

export default FilterComponent;
