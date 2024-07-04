// Imports from react
import { useState } from 'react';
import { useNavigate } from "react-router";
import { MdHome } from 'react-icons/md';

// COmponent imports
import Header from "../components/Header";

// Styling imports
import "../styles/Signup.css"

export default function Signup() {
    // Keep track of all the form data
    const [ formData, setFormData ] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        state: "",
        city: "",
        password1: "",
        password2: "",
        is_vendor: null,
    });
    const apiURL = process.env.REACT_APP_API_URL;

    // Keep track of al lthe form errors
    const [errors, setErrors] = useState({});

    // Set a message to display when there are for errors
    const [ message, setMessage ] = useState("");

    const navigate = useNavigate();

    // Handle all form changes
    function handleChange(e) {
        let { name, value } = e.target;

        // Convert the string type to bool for the is_vendor attribute
        if (name === "is_vendor") {
            if (value === "true") {
                value = true
            } else if (value === "false") {
                value = false
            }
        }
        setFormData(prevState => ({...prevState, [name]: value}));

        // Validate inpiut every time form data changes
        const newErrors = validateInput(name, value);
        setErrors(newErrors);
    }

    function goToLogin () {
        navigate('/login');
    };

    // Handles al linput validation
    function validateInput(name, value) {
        const newErrors = { ...errors }; // Copy existing errors
        switch (name) {
            case 'first_name':
                if (!value || value === "") {
                    newErrors.first_name = (<p className='input-error'>
                        First name cannot be empty
                    </p>)
                } else if (value.length < 3) {
                    newErrors.first_name = (<p className='input-error'>
                        First name must be at least 3 characters long
                    </p>)
                } else {
                    delete newErrors.first_name;
                }
                break;
            case 'last_name':
                if (!value || value === "") {
                    newErrors.last_name = (<p className='input-error'>
                        Last name cannot be empty
                    </p>)
                } else if (value.length < 3) {
                    newErrors.last_name = (<p className='input-error'>
                        Last name must be at least 3 characters long
                    </p>)
                } else {
                    delete newErrors.last_name;
                }
                break;
            case 'email':
                // Regual expression for email validation
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const parts = value.split('@');
                if (!value || value === "") {
                    newErrors.email = (<p className='input-error'>
                        Email cannot be empty
                    </p>)
                } else if (value.length > 320) {
                    newErrors.email = (<p className='input-error'>
                        Email too long
                    </p>)
                } else if (!regex.test(value)) {
                    newErrors.email = (<p className='input-error'>
                        Please enter a valid email
                    </p>)
                } else if (parts[0].length > 64 ||
                           parts[1].length > 255) {
                     newErrors.email = (<p className='input-error'>
                            Please enter a valid email
                        </p>)
                } else {
                   delete newErrors.email;
                }
                break;
                case 'phone_number':
                    let phoneRegex = /^(?:\+?(\d{1,3}))?[-. (]*(\d{1,4})[-. )]*(\d{1,4})[-. ]*(\d{1,9})(?: *x(\d+))?$/;
                    if (!phoneRegex.test(value) || value.length < 10) {
                        newErrors.phone = (<p className='input-error'>
                            Please enter a valid phone number (Example: +123456789012)
                        </p>)
                    } else {
                        delete newErrors.phone;
                    }
                    break;
                case 'password1':
                    if (!value || value === "") {
                        newErrors.password1 = (<p className='input-error'>
                            password cannot be empty
                        </p>)
                    } else if (value.length < 8) {
                        newErrors.password1 = (<p className='input=error'>
                            password must be 8 or more characters
                        </p>)
                    } else if(!/[A-Z]/.test(value)){
                        newErrors.password1 = (<p className='input-error'>
                            password must contain at least one upper case letter
                        </p>)
                    } else if (!/[a-z]/.test(value)) {
                        newErrors.password1 = (<p className='input-error'>
                            password must contain atleast one lowercase letter
                        </p>)
                    } else if (!/\d/.test(value)) {
                        newErrors.password1 = (<p className='input-error'>
                            password must contain at least one number
                        </p>)
                    } else if (!/[!@#$%^&*]/.test(value)) {
                        newErrors.password1 = (<p className='input-error'>
                            password must contain at least onespecial character (!@#$%^&*)
                    </p>)
                    } else {
                        delete newErrors.password1
                    }
                    break;
                case 'state':
                    if(!value) {
                        newErrors.state = (<p  className='input-error'>
                            State cannot be empty
                        </p>)
                    } else {
                        delete newErrors.state;
                    }
                    break;
                case 'city':
                    if(!value) {
                        newErrors.city = (<p  className='input-error'>
                            City cannot be empty
                        </p>)
                    } else {
                        delete newErrors.city;
                    }
                    break;
                case 'password2':
                    // Get the first password
                    const passwd = formData.password1;
                    if(value !== passwd) {
                        newErrors.password2 = (<p className='input-error'>
                            passwords do not match
                        </p>)
                    } else {
                        delete newErrors.password2;
                    }
                    break;
                case 'is_vendor':
                    if(value === null || value === "") {
                        newErrors.is_vendor = (<p className='input-error'>
                        please make a selection
                    </p>)
                    } else {
                        delete newErrors.is_vendor;
                    }
                    break;
                default:
                    break;
        }
        return newErrors;
    }

    async function handleSubmit(e) {
        // Prevent default in case there are form errors
        e.preventDefault();

        // Get all the keys and values of th formData
        // For final form validation
        const formKeys = Object.keys(formData);
        const formValues = Object.values(formData);

        let newErrors = {};

        // Final form validation
        for (let i = 0;  i < formKeys.length; i++) {
            newErrors = {...newErrors, ...validateInput(formKeys[i], formValues[i])};
        }

        setErrors(newErrors);

        // bool
        const hasErrors = Object.keys(newErrors).length > 0;
        if (hasErrors) {
            setMessage(<p className="submit-error">Please fix all form errors before submitting</p>)
            return;
        }
        // Send a request to register the user
        try {
            const jsonData = JSON.stringify(formData);
            const response = await fetch(`${apiURL}/api-auth/users/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });

            if (response.ok) {
                if(response.status === 204) {
                    setMessage("User registered successfully");
                    goToLogin();
                } 
            } else {
                if (response.status === 400) {
                    const responseJSON = await response.json();
                    if (responseJSON.email[0] === "email already exists.") {
                        setMessage(<p className="submit-error">
                        Email already registered.
                        Please try logging in if you have an account
                    </p>)
                    return;
                    }
                } else {
                    console.log("I am not okay");
                }
            }
        } catch(error) {
            console.error('Failed to submit form:', error)
            setMessage(<p className="submit-error">
                There was an issue submitting the form. Please try again
            </p>)
        }
    }

    return (
        <>
            <div className="header-container">
                <Header user={null}/>
                <MdHome className='home-icon' onClick={() => {navigate('/')}} />
            </div>

            <main className="signup">
                <div className="signup-container">
                    <h2 className="signup-header">Sign up</h2>
                    <hr />
                    
                    <h3 className="signup-header3">
                        Welcome!
                    </h3>
                    <div className="input-container">
                        <label htmlFor="first-name">First name</label>
                        <input type="text" name="first_name" id="first-name" 
                               onChange={handleChange}
                               aria-describedby={`first_name-error ${errors.first_name ? 'error' : ''}`}
                               required={true}
                            />
                        {/* Display an error message if there is an issue with the input */}
                        <span id='first_name-error' className='error-message'>
                            {errors.first_name}
                        </span>

                        <label htmlFor="last-name">Last name</label>
                        <input type="text" name="last_name" id="last-name"
                               onChange={handleChange}
                               aria-describedby={`last_name-error ${errors.last_name ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='last_name-error' className='error-message'>
                            {errors.last_name}
                        </span>

                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email"
                               onChange={handleChange}
                               aria-describedby={`email-error ${errors.email ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='email-error' className='error-message'>
                            {errors.email}
                        </span>

                        <label htmlFor="phone">Phone number</label>
                        <input type="text" name="phone_number" id="phone"
                               onChange={handleChange}
                               aria-describedby={`phone-error ${errors.phone ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='phone-error' className='error-message'>
                            {errors.phone}
                        </span>

                        <label htmlFor="state">State</label>
                        <input type="text" name="state" id="state"
                               onChange={handleChange}
                               aria-describedby={`state-error ${errors.state ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='state-error' className='error-message'>
                            {errors.state}
                        </span>

                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city"
                               onChange={handleChange}
                               aria-describedby={`city-error ${errors.city ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='city-error' className='error-message'>
                            {errors.city}
                        </span>


                        <label htmlFor="password1">Password</label>
                        <input type="password" name="password1" id="password1"
                               onChange={handleChange}
                               aria-describedby={`password1-error ${errors.password1 ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='password1-error' className='error-message'>
                            {errors.password1}
                        </span>

                        <label htmlFor="password2">Confirm password</label>
                        <input type="password" name="password2" id="confirm-password1"
                               onChange={handleChange}
                               aria-describedby={`password2
                               -error ${errors.password2
                                 ? 'error' : ''}`}
                               required={true}
                            />
                        <span id='password2
                        -error' className='error-message'>
                            {errors.password2}
                        </span>

                        {/* Define user type */}
                        <div className="radio-container">
                            <div className="buyer">
                                <input type="radio" name="is_vendor" id="buyer" value={false}
                                       onClick={handleChange} />
                                <label htmlFor="buyer">I want to buy groceires</label>
                            </div>

                            <div className="vendor">
                                <input type="radio" name="is_vendor" id="vendor" value={true}
                                       onClick={handleChange} />
                                <label htmlFor="vendor">I want to sell groceries</label>
                            </div>
                        </div>
                        <span id='user-type-error' className='error-message'>
                            {errors.is_vendor}
                        </span>

                    </div>

                    <p className="small">Already have an account? <span className="green" onClick={goToLogin}>Login</span> instead.
                    </p>

                    <div className="signup-btn-container">
                        <button className="continue"
                                onClick={handleSubmit}>
                            Continue
                        </button>
                    </div>
                    {message && message}
                </div>
            </main>  
        </>
    )
}