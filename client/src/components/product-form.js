import React, { useState } from 'react';
import SliderAttribute from './slider-attribute';  // Import your custom slider component
import { Button, Box } from '@mui/material';
import InputAttribute from './input-attribute';
import CheckboxAttribute from './checkbox-attribute';
import DropdownAttribute from './dropdown-attribute';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function ProductForm() {

    const navigate = useNavigate ();
    
    // SLIDERS
    const [formData, setFormData] = useState({
        productName: '',
        distance: '',
        adaptive: false,
        digitalProtection: 30,
        hardening: 50,
        antireflex: 50,
        oleophobic: 50,
        hydrophobic: 50,
        antistatic: 50,
        digital: 50,
        thicknessReduction: '',
        comfort: 50,
        heliomat: 50,
        customization: false,
        blueFilter: false,
        userOwner: window.localStorage.getItem("UserID")
    });

    


    const handleAttributeChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setFormData(formData => ({
                ...formData,
                [name]: checked  // Use the 'checked' value for checkboxes
            }));
        } else {
            setFormData(formData => ({
                ...formData,
                [name]: value  // Use the 'value' for other inputs
            }));
        }
    };
    

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post("http://localhost:3001/products", formData);
            if (response.status === 201) { // Check if the creation was successful
                alert("Produs creat cu succes!");
                navigate('/');
            } else {
                alert("Product creation failed. Please check your data.");
            }
        } catch (err) {
            alert("An error occurred. Please try again.");
        }
    };



    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth: '500px' }}>
            
            <InputAttribute
                name="productName"
                label="Nume produs nou"
                value={formData.productName}
                onChange={handleAttributeChange}
            />
            <DropdownAttribute
                name="distance"
                label={"Distanta"}
                value={formData.distance}
                onChange={handleAttributeChange}
                options={[
                    { value: 'aproape', label: 'aproape' }, 
                    { value: 'departe', label: 'departe' },
                    { value: 'intermediar', label: 'intermediar' },
                ]}
            />
            <DropdownAttribute
                name="thicknessReduction"
                label={"Subtiere"}
                value={formData.thicknessReduction}
                onChange={handleAttributeChange}
                options={[
                    { value: 'Grad 1', label: 'Grad 1' }, 
                    { value: 'Grad 2', label: 'Grad 2' },
                    { value: 'Grad 3', label: 'Grad 3' },
                ]}
            />
            <SliderAttribute
                name = 'digitalProtection'
                title="Protectie digitala"
                value={formData.digitalProtection}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'digitalProtection', value: newValue }})}
                min={0}
                max={100}
                step={20}
            />
            <SliderAttribute
                name = 'hardening'
                title="Duritate"
                value={formData.hardening}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'hardening', value: newValue }})}
                min={0}
                max={100}
                step={20}
            />
            <SliderAttribute
                name = 'antireflex'
                title="Antireflex"
                value={formData.antireflex}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'antireflex', value: newValue }})}
                min={0}
                max={100}
                step={20}
            />
            <SliderAttribute
                name = 'antistatic'
                title="Antistatic"
                value={formData.antistatic}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'antistatic', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />
            <SliderAttribute
                name = 'comfort'
                title="Confort"
                value={formData.comfort}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'comfort', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />
            <SliderAttribute
                name = 'heliomat'
                title="Heliomat"
                value={formData.heliomat}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'heliomat', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />
            <CheckboxAttribute
                name="adaptive"
                label="Adaptiv"
                checked={formData.adaptive}
                onChange={handleAttributeChange}
            />
            <CheckboxAttribute
                name="customization"
                label="Personalizare"
                checked={formData.customization}
                onChange={handleAttributeChange}
            />
            <CheckboxAttribute
                name="blueFilter"
                label="Filtru lumina albastra"
                checked={formData.blueFilter}
                onChange={handleAttributeChange}
            />



            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Salveaza produs
            </Button>
        </Box>
    );
}

export default ProductForm;
