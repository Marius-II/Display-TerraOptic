import React from 'react';
import ProductForm from '../components/product-form';


function CreateProduct() {


    return (
        <div className='create-product'>
            <h2 style={{marginTop: '2em'}}>Creaza Produs Nou</h2>
            <ProductForm/>
        </div>
    );
}

export default CreateProduct;
