import React, { useState } from 'react';
import SliderAttribute from './slider-attribute';  // Import your custom slider component
import { Button, Box } from '@mui/material';
import InputAttribute from './input-attribute';
import CheckboxAttribute from './checkbox-attribute';
import DropdownAttribute from './dropdown-attribute';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function ProductForm() {

    const colorOptions = [
        { value: 'alb', label: 'alb' }, // White
        { value: 'crem', label: 'crem' }, // Cream
        { value: 'galben', label: 'galben' }, // Yellow
        { value: 'roz', label: 'roz' }, // Pink
        { value: 'orange', label: 'orange' }, // Orange
        { value: 'albastru', label: 'albastru' }, // Blue
        { value: 'verde', label: 'verde' }, // Green
        { value: 'mustar', label: 'mustar' }, // Mustard
        { value: 'gri', label: 'gri' }, // Gray
        { value: 'silver', label: 'silver' }, // Shining Silver
        { value: 'gold', label: 'gold' }, // Shining Gold
        { value: 'violet', label: 'violet' }, // Violet
    ];

    const navigate = useNavigate ();
    
    // SLIDERS
    const [formData, setFormData] = useState({
        productName: '',
        price: 100,
        description: '',
        distance: '',

        hardening: 50,
        antireflex: 50,
        oleophobic: 50,
        hydrophobic: 50,
        antistatic: 50,

        blueFilter: 30,

        thicknessReduction: 30,

        

        heliomat: 30,

        distanceAttribute: 50,
        intermediarAttribute: 50,
        closeAttribute: 50,
        
        comfort: 50,
        focalization: 50,
        adaptive: 50,
        
        customization: false,
        
        primaryProductColor: '',
        secondaryProductColor: '',
        visualField: '',
        deliveryTime: '',
        userOwner: window.localStorage.getItem("UserID")
    });

    


    const handleAttributeChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setFormData(formData => {
                const updatedFormData = {
                    ...formData,
                    [name]: checked  // Use the 'checked' value for checkboxes
                };
                if (name === "customization") {
                    updatedFormData.deliveryTime = checked ? "10-14 Zile lucratoare" : "3-5 zile lucratoare";
                }
                return updatedFormData;
            });
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

            <InputAttribute
                name="price"
                label="Pret"
                value={formData.price}
                onChange={handleAttributeChange}
            />

            <InputAttribute
                name="description"
                label="Descriere produs"
                value={formData.description}
                onChange={handleAttributeChange}
                multiline
                rows={4}
            />


            <DropdownAttribute
                name="distance"
                label={"Tipul de ochelari"}
                value={formData.distance}
                onChange={handleAttributeChange}
                options={[
                    { value: 'distanta', label: 'Distanta' }, 
                    { value: 'aproape', label: 'Aproape' },
                    { value: 'bifocal', label: 'Bifocal' },
                    { value: 'progresiv', label: 'Progresiv' },
                    { value: 'degresiv', label: 'Degresiv' },
                    { value: 'monofocal', label: 'Monofocal' },
                    { value: 'distanta-aproape', label: 'Distanta-Aproape' },
                ]}
            />

            <SliderAttribute
                name = 'hardening'
                title="Duritate"
                value={formData.hardening}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'hardening', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />

            <SliderAttribute
                name = 'antireflex'
                title="Antireflex"
                value={formData.antireflex}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'antireflex', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />

            <SliderAttribute
                name = 'oleophobic'
                title="Oleofob"
                value={formData.oleophobic}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'oleophobic', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />

            <SliderAttribute
                name = 'hydrophobic'
                title="Hidrofob"
                value={formData.hydrophobic}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'hydrophobic', value: newValue }})}
                min={0}
                max={100}
                step={10}
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

            <DropdownAttribute
                name="blueFilter"
                label={"Filtru lumina albastra"}
                value={formData.blueFilter}
                onChange={handleAttributeChange}
                options={[
                    { value: 0, label: 'Fara filtru lumina albastra' }, 
                    { value: 30, label: 'Emerald' },
                    { value: 60, label: 'Emerald blue' },
                    { value: 90, label: 'Blue' },
                ]}
            />


            <DropdownAttribute
                name="thicknessReduction"
                label={"Subtiere"}
                value={formData.thicknessReduction}
                onChange={handleAttributeChange}
                options={[
                    { value: 0, label: 'Fara subtiere' }, 
                    { value: 30, label: 'Lite' },
                    { value: 60, label: 'Lite+' },
                    { value: 90, label: 'Lite++' },
                ]}
            />

            <DropdownAttribute
                name="heliomat"
                label={"Heliomat"}
                value={formData.heliomat}
                onChange={handleAttributeChange}
                options={[
                    { value: 0, label: 'fara heliomat' }, 
                    { value: 30, label: 'clasic' },
                    { value: 60, label: 'avansat' },
                    { value: 90, label: 'expert' },
                ]}
            />

            <SliderAttribute
                name = 'distanceAttribute'
                title="Distanta"
                value={formData.distanceAttribute}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'distanceAttribute', value: newValue }})}
                min={0}
                max={100}
                step={10}
            /> 
            <SliderAttribute
                name = 'intermediarAttribute'
                title="Intermediar"
                value={formData.intermediarAttribute}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'intermediarAttribute', value: newValue }})}
                min={0}
                max={100}
                step={10}
            /> 
            <SliderAttribute
                name = 'closeAttribute'
                title="Aproape"
                value={formData.closeAttribute}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'closeAttribute', value: newValue }})}
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
                name = 'focalization'
                title= 'Focalizare'
                value={formData.focalization}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'focalization', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />

            <SliderAttribute
                name = 'adaptive'
                title= 'Adaptare'
                value={formData.adaptive}
                onChange={(e, newValue) => handleAttributeChange({ target: { name: 'adaptive', value: newValue }})}
                min={0}
                max={100}
                step={10}
            />


            <DropdownAttribute
                name="primaryProductColor"
                label="Culoare Primara"
                value={formData.primaryProductColor}
                onChange={handleAttributeChange}
                options={colorOptions}
            />
            <DropdownAttribute
                name="secondaryProductColor"
                label="Culoare Secundara"
                value={formData.secondaryProductColor}
                onChange={handleAttributeChange}
                options={colorOptions}
            />
            <DropdownAttribute
                name="visualField"
                label="Camp Vizual"
                value={formData.visualField}
                onChange={handleAttributeChange}
                options={[
                    { value: 'mic', label: 'Mic' }, 
                    { value: 'mediu', label: 'Mediu' },
                    { value: 'mare', label: 'Mare' },
                    { value: 'n/a', label: 'n/a' }
                ]}
            />
            <CheckboxAttribute
                name="customization"
                label="Personalizare"
                checked={formData.customization}
                onChange={handleAttributeChange}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Salveaza produs
            </Button>
        </Box>
    );
}

export default ProductForm;
