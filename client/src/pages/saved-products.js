import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/product-card';

export const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedProducts = async () => {
    const userID = window.localStorage.getItem("UserID");
    try {
      const response = await axios.get(`http://localhost:3001/products/savedProducts/${userID}`);
      setSavedProducts(response.data.savedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSavedProduct = async (productID) => {
    const userID = window.localStorage.getItem("UserID");
    try {
      const payload = { productID, userID };
      await axios.put("http://localhost:3001/products/removeSavedProduct", payload);
      setSavedProducts(prevProducts => prevProducts.filter(product => product._id !== productID));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSavedProducts();
  }, []);

  const isProductSaved = (id) => {
    return savedProducts.some(product => product._id === id);
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
        {/* You can keep filters if you plan to add filtering functionality */}
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
      >
        {loading ? (
          <div>Loading saved products...</div>
        ) : (
          savedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isProductSaved={isProductSaved}
              onRemoveSavedProduct={handleRemoveSavedProduct}
            />
          ))
        )}
      </div>
      <div style={{ gridArea: 'offers', border: '1px solid #ccc', padding: '10px' }}>
        Special Offers
      </div>
    </div>
  );
};
