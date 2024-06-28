// imports from react
import { useNavigate } from "react-router";
import { useState } from "react";

// Custom component import
import Header from "../components/Header";

// Styling import
import "../styles/Login.css";

export default function Login() {
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    // keep track of all from errors on the page
    const [ errors, setErrors ] = useState({});
    
    // Sets a message when user tries to sign in with invalid information
    const [ message, setMessage ] = useState("");
    
    // Keep track of all form changes
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));

        // Check for errors everytime formData changes
        const newErrors = validateInput(name, value);
        setErrors(newErrors);
    }

    const navigate = useNavigate();

    function goToSignUp () {
        navigate('/signup');
    };

    // If the user is a buyer, this is the "home page"
    function goHome (user) {
        navigate('/', { state: { user: user }});
    }

    // If the user is a vendor, this is a "home page"
    function goToDashboard (user) {
        navigate('/dashboard', { state: { user: user }});
    }

    // Takes care of all input validation
    function validateInput(name, value) {
        const newErrors = { ...errors }; // Copy existing errors
        switch(name) {
            case 'email':
                // regualr expression for email
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
                // This next one tests the length of each part of email separately
                } else if (parts[0].length > 64 ||
                           parts[1].length > 255) {
                     newErrors.email = (<p className='input-error'>
                            Please enter a valid email
                        </p>)
                } else {
                   delete newErrors.email;
                }
                break;
                case 'password':
                    if (!value || value === "") {
                        newErrors.password = (<p className='input-error'>
                            Password cannot be empty
                        </p>)
                    } else if (value.length < 8) {
                        newErrors.password = (<p className='input=error'>
                            password must be 8 or more characters
                        </p>)
                    } else if(!/[A-Z]/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            Password must contain at least one upper case letter
                        </p>)
                    } else if (!/[a-z]/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            password must contain atleast one lowercase letter
                        </p>)
                    } else if (!/\d/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            password must contain at least one number
                        </p>)
                    } else if (!/[!@#$%^&*]/.test(value)) {
                        newErrors.password = (<p className='input-error'>
                            password must contain at least onespecial character (!@#$%^&*)
                    </p>)
                    } else {
                        delete newErrors.password
                    }
                    break;
                default: break;
        }

        // Return any new errors that were found
        return newErrors;
    }

    async function handleSubmit(e) {
        // Prevent default in case there are are any form errors
        e.preventDefault();

        // Get all the keys and values of the formData object for
        // final input validation 
        const formKeys = Object.keys(formData);
        const formValues = Object.values(formData);

        let newErrors = {};

        // Final input validation vefore submitting
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
            
        // If there are no errors set the message to null
        setMessage(null);

        try {
            // Send user to back-end for validation and retrieve session_id
            const responseToken = await fetch('http://127.0.0.1:8000/api-auth/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            let returnedToken;
            if (responseToken.ok) {
                returnedToken = await responseToken.json();
                if (responseToken.length !== 0) {
                    console.log("Form submitted successfully")
                }
            } else {
                if (responseToken.status >= 400) {
                    setMessage(<p className="submit-error">
                        Incorrect email or password
                    </p>)
                    return;
                } else {
                    console.error("I am not ok");
                    return;
                }
            }

            // use the session ID to retrieve the user object
            const responseUser = await fetch('http://127.0.0.1:8000/api-auth/users/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${returnedToken.key}`,
                },
            });

            if (responseUser.ok) {
                console.log("Getting user...");
                if (responseToken.status == 400) {
                    return;
                }
                const returnedUser = await responseUser.json();

                // Pass the returned user to the pages
                returnedUser.is_vendor ? goToDashboard(returnedUser) : goHome(returnedUser); 

            } else {
                console.log(responseUser)
            }
        } catch(error) {
            console.error('Failed to submit form:', error)
        }
    }

    return (
        <>
            <div className="header-container">
                <Header user={null}/>
            </div>

            <main className="login">
                <div className="login-container">
                    <h2 className="login-header">Login</h2>
                    <hr />
                    
                    <h3 className="login-header">
                        Welcome back!
                    </h3>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email"
                               onChange={handleChange}
                               aria-describedby={`email-error ${errors.email ? 'error' : ''}`}
                               required={true}
                            />
                        {/* Display an error message if there is an issue with the input */}
                        <span id='email-error' className='login-error-message'>
                            {errors.email}
                        </span>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                             onChange={handleChange}
                             aria-describedby={`password-error ${errors.password ? 'error' : ''}`}
                             required={true}
                          />
                      <span id='password-error' className='login-error-message'>
                          {errors.password}
                      </span>
                    </div>

                    <p className="small">Don't have an account? <span className="green" onClick={goToSignUp}>Sign Up</span> instead.</p>

                    <button className="continue"
                            onClick={handleSubmit}>
                        Continue
                    </button>
                    {/* Display a message if there are form errors */}
                    {message && message}
                </div>
            </main>
        </>
    )
}