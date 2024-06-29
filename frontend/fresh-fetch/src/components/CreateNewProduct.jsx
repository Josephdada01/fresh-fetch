import React, { useState } from 'react';

import '../styles/CreateNewProduct.css';


function CreateNewProduct({ createProduct }) {

  // Get all the info necessary to create a new product
  
  // Keep track of the popup form state
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    price: 0,
    stock_count: 0,
  });

  const [ errors, setErrors ] = useState({});

  // Handles all form change and updates the state
  const handleChange = (e) => {
    let { name, value, type, files } = e.target;
    if (name === "image") {
      value = null
    } else if (name === "price" || name === "stock_count"){
      if(value) {
        value = Number(value);
      }
    }
    setFormData({
      ...formData,
      [name]: /* type === 'file' ? files[0] :*/ value
    });

    const newErrors = validatInput(name, value);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      return;
    }

    // If all of these input fields are not empty
    if (/* formData.image &&*/ formData.name && formData.price && formData.stock_count ) {
      // Calls a function from the parent component that creates the product
      createProduct(formData);
      // closes the popup form
      setIsOpen(false);
      setFormData({
        image: null,
        name: '',
        price: 0,
        stock_count: 0,
      });
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const validatInput = (name, value) => {
    const newErrors = {...errors}
    switch(name) {
      case 'name':
        if (!value || value === "") {
          newErrors.name = (<p className='error-message'>
            Name cannot be empty
          </p>)
        } else if (value.length < 3) {
          newErrors.name = (<p className='error-message'>
            Name has to be longer than 3 letters
          </p>)
        } else {
          delete newErrors.name;
        }
        break;
        default:
          break;
    }
    return newErrors;
  }

  // Makes sure all form data is not empty
  const isFormIncomplete = formData.name && formData.price  && formData.stock_count;

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
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    aria-describedby={`email-error ${errors.email ? 'error' : ''}`}
                 />
             {/* Display an error message if there is an issue with the input */}
             <span id='name-error' className='name-error-message'>
                 {errors.name}
             </span>
            </label>
            <label>
              Price per pound:
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              Available Stock(in kg):
              <input type="number" name="stock_count" id="stock" value={formData.stock_count} onChange={handleChange} required />
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
