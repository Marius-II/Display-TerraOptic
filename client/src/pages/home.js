import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '../components/product-card';
import FilterComponent from '../components/Filters/checkbox-filter';
import terraLogo from '../assets/terraLogo.png'; // Adjust the path to where your Terra logo is stored

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
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

  // Restore filters and scroll position from localStorage
  useEffect(() => {
    const savedFilters = JSON.parse(window.localStorage.getItem('filters'));
    if (savedFilters) {
      setFilters(savedFilters);
    }

    const savedScrollPosition = window.localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  // Save filters and scroll position to localStorage
  useEffect(() => {
    window.localStorage.setItem('filters', JSON.stringify(filters));

    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    window.localStorage.setItem('scrollPosition', scrollPosition);
  }, [filters, page]);

  const fetchSavedProducts = async () => {
    const userID = window.localStorage.getItem("UserID");
    try {
      const response = await axios.get(`http://localhost:3001/products/savedProducts/ids${userID}`);
      if (response.data && response.data.savedProducts) {
        setSavedProducts(response.data.savedProducts);
      } else {
        setSavedProducts([]); // Fallback to an empty array if the response is not as expected
      }
    } catch (err) {
      console.error(err);
      setSavedProducts([]); // Fallback to an empty array on error
    }
  };

  // Fetch products based on filters and page
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const activeFilters = Object.keys(filters)
        .filter((key) => filters[key].length > 0 || (filters[key] !== '' && (key === 'minPrice' || key === 'maxPrice')))
        .reduce((acc, key) => {
          acc[key] = filters[key];
          return acc;
        }, {});

      const response = await axios.get(`http://localhost:3001/products/filter`, {
        params: { ...activeFilters, page, limit: 20 }
      });

      const fetchedProducts = response.data.products;

      if (page === 1) {
        setProducts(fetchedProducts); // Reset products for new filters
      } else {
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      }

      if (fetchedProducts.length < 20) {
        setHasMore(false); // No more products if less than 20 are returned
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchProducts();
    fetchSavedProducts();
  }, [fetchProducts]);

  // Handle filter changes and reset the product list
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setProducts([]); // Reset products when filters are changed
    setPage(1); // Reset to page 1 on new filters
    setHasMore(true); // Allow further fetching
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const isProductSaved = (id) => {
    return savedProducts.includes(id);
  };

  const handleSaveProduct = async (productID) => {
    const userID = window.localStorage.getItem("UserID");
    try {
      const payload = { productID, userID };
      await axios.put("http://localhost:3001/products", payload);
      setSavedProducts((prevSavedProducts) => [...prevSavedProducts, productID]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveSavedProduct = async (productID) => {
    const userID = window.localStorage.getItem("UserID");
    try {
      const payload = { productID, userID };
      await axios.delete(`http://localhost:3001/products/${productID}`, { data: payload });
      setSavedProducts((prevSavedProducts) => prevSavedProducts.filter(id => id !== productID));
    } catch (err) {
      console.error(err);
    }
  };

  const isFilterApplied = () => {
    return Object.values(filters).some((filter) => (Array.isArray(filter) && filter.length > 0) || (typeof filter === 'string' && filter !== ''));
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `
          'filters products products'
          'filters products products'
        `,
        gridTemplateColumns: '1fr 3fr',
        gap: '3px',
        padding: '5px',
        height: 'calc(100vh - 40px)',
        overflow: 'hidden'
      }}
    >
      <div style={{ gridArea: 'filters', border: '1px solid #ccc', padding: '10px', overflowY: 'auto', height: '100%' }}>
        <FilterComponent onFilterChange={handleFilterChange} appliedFilters={filters} />
      </div>

      <div
        style={{
          gridArea: 'products',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: isFilterApplied() ? 'center' : 'center',
          alignItems: isFilterApplied() ? 'flex-start' : 'center',
          overflowY: 'auto',
          height: '100%',
          backgroundColor: 'black',
          color: 'white',
          padding: '10px',
        }}
        onScroll={handleScroll}
      >
        {isFilterApplied() ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isProductSaved={isProductSaved}
              onSaveProduct={handleSaveProduct}
              onRemoveSavedProduct={handleRemoveSavedProduct}
            />
          ))
        ) : (
          <div style={{ padding: '120px' }}>
            <img src={terraLogo} alt="Terra Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
          </div>
        )}
        {loading && <div>Loading more products...</div>}
      </div>
    </div>
  );
};
