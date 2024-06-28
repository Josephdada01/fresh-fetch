import React, { useState } from 'react';

import '../styles/CreateNewProduct.css';


function CreateNewProduct({ createProduct }) {

  // Get all the info necessary to create a new product
  
  // Keep track of the popup form state
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    price: '',
    stock: ''
  });

  // Handles all form change and updates the state
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If all of these input fields are not empty
    if (formData.image && formData.name && formData.price && formData.stock) {

      // Calls a function from the parent component that creates the product
      createProduct(formData);
      // closes the popup form
      setIsOpen(false);
      setFormData({
        image: null,
        name: '',
        price: '',
        stock: ''
      });
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  // Makes sure all form data is not empty
  const isFormIncomplete = formData.name && formData.price && formData.stock;

  // If form not complete, display a cancel button. Else, a submit button
  const createOrCancel = isFormIncomplete ?
                                <button type="submit" disabled={!isFormIncomplete}>Create</button> 
                            :
                            <button onClick={toggleForm} className="cancel-btn">Cancel</button> 
  return (
    <div className="new-product-form">
      {isOpen && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <label>
              Image:
              <input type="file" name="image" onChange={handleChange} required />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Price per pound:
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              Available Stock(in kg):
              <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required />
            </label>
            {/* Disable the button if form is incomplete */}
            <button type="submit" disabled={!isFormIncomplete}>Create</button> 
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateNewProduct