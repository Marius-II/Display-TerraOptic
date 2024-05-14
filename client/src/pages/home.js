import {useState, useEffect} from 'react';
import axios from 'axios';
import ProductCard from '../components/product-card'


export const Home = () => {
    const [products, setProducts] = useState ([])


    useEffect(() => {
        axios.get('http://localhost:3001/products')
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div style={{
            display: 'grid',
            gridTemplateAreas: `
                'filters header header'
                'filters products products'
                'offers offers offers'
            `,
            gridTemplateColumns: '1fr 3fr',
            gap: '3px',
            padding: '5px',
            height: 'calc(100vh - 40px)',  // Full viewport height
            overflow: 'hidden'  // Prevent scrolling outside specific areas
        }}>
            <div style={{ gridArea: 'filters', border: '1px solid #ccc', padding: '10px' }}>Filter Components</div>
            <div style={{ gridArea: 'header', border: '1px solid #ccc', padding: '10px' }}>General Client Data</div>
            <div style={{
                gridArea: 'products',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                overflowY: 'auto',  // Enable vertical scrolling
                maxHeight: 'calc(100vh - 200px)'  // Adjust height accordingly
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div style={{ gridArea: 'offers', border: '1px solid #ccc', padding: '10px' }}>Special Offers</div>
        </div>

    );
}