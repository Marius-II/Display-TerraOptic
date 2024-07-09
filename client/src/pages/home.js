import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '../components/product-card';
import FilterComponent from '../components/Filters/checkbox-filter';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    distance: [],
    thicknessReduction: [],
    heliomat: [],
    blueFilter: [],
    visualField: [],
    minPrice: '',
    maxPrice: ''
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const activeFilters = Object.keys(filters)
        .filter((key) => filters[key].length > 0 || (key === 'minPrice' || key === 'maxPrice'))
        .reduce((acc, key) => {
          if (filters[key].length > 0 || (key === 'minPrice' || key === 'maxPrice')) {
            acc[key] = filters[key];
          }
          return acc;
        }, {});

      const response = await axios.get(`http://localhost:3001/products/filter`, {
        params: { ...activeFilters, page, limit: 20 }
      });

      const fetchedProducts = response.data.products;
      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      if (fetchedProducts.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `
          'filters header header'
          'filters products products'
          'offers offers offers'
        `,
        gridTemplateColumns: '1fr 3fr',
        gap: '3px',
        padding: '5px',
        height: 'calc(100vh - 40px)',
        overflow: 'hidden'
      }}
    >
      <div style={{ gridArea: 'filters', border: '1px solid #ccc', padding: '10px', overflowY: 'auto', maxHeight: 'calc(100vh - 40px)' }}>
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div style={{ gridArea: 'header', border: '1px solid #ccc', padding: '10px' }}>
        General Client Data
      </div>
      <div
        style={{
          gridArea: 'products',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)'
        }}
        onScroll={handleScroll}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {loading && <div>Loading more products...</div>}
      </div>
      <div style={{ gridArea: 'offers', border: '1px solid #ccc', padding: '10px' }}>
        Special Offers
      </div>
    </div>
  );
};
