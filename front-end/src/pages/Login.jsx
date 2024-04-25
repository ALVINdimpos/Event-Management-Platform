import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/reducers/authSlice';
import { jwtDecode } from "jwt-decode";
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear previous error messages when the user starts typing again
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation checks
        const { email, password } = formData;
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await login({ email, password }).unwrap();
            // Handle successful login response
            setSuccess('Login successful. Redirecting...');
            // Save the token and user data in the Redux store
            dispatch(setToken(response.token));
            const decodedToken = jwtDecode(response.token);
            dispatch(setUser(decodedToken));
            // redirect to the home page
            navigate('/');
        } catch (error) {
            // Handle API errors or display a generic error message
            console.error('Login error:', error);
            setErrors({ general: 'An error occurred. Please try again later.' });
        }
    };
    return (
        <div className='flex items-center justify-center w-full min-h-screen text-gray-600 bg-gray-50'>
            <div className='relative'>
                <div className='absolute hidden w-56 h-56 text-primary-300 sm:block a-z-10 -left-20 -top-20'>
                    <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                            <pattern
                                id='a'
                                patternUnits='userSpaceOnUse'
                                width='40'
                                height='40'
                                patternTransform='scale(0.6) rotate(0)'
                            >
                                <rect x='0' y='0' width='100%' height='100%' fill='none' />
                                <path
                                    d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'
                                    strokeWidth='1'
                                    stroke='none'
                                    fill='primary'
                                />
                            </pattern>
                        </defs>
                        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' />
                    </svg>
                </div>
                <div className='absolute hidden text-primary-300 sm:block h-28 w-28 a-z-10 -right-20 -bottom-20'>
                    <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                            <pattern
                                id='b'
                                patternUnits='userSpaceOnUse'
                                width='40'
                                height='40'
                                patternTransform='scale(0.5) rotate(0)'
                            >
                                <rect x='0' y='0' width='100%' height='100%' fill='none' />
                                <path
                                    d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'
                                    strokeWidth='1'
                                    stroke='none'
                                    fill='primary'
                                />
                            </pattern>
                        </defs>
                        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' />
                    </svg>
                </div>

                {/* login */}
                <div className='relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4'>
                    <div className='flex-auto p-6'>
                        <p className='mb-6 text-gray-500'>Please sign-in to access your account</p>

                        <form id='' className='mb-4' action='#' method='POST'>
                            <div className='mb-4'>
                                <label htmlFor='email' className='inline-block mb-2 text-xs font-medium text-gray-700 uppercase'>
                                    Email or Username
                                </label>
                                <input
                                    type='text'
                                    className='block w-full px-3 py-2 text-sm border border-gray-400 rounded-md outline-none appearance-none cursor-text bg--100 focus:border-primary-500 focus:bg-white focus:text-gray-600 focus:shadow'
                                    id='email'
                                    name='email'
                                    onChange={handleChange}
                                    placeholder='Enter your email or username'
                                    autoFocus
                                />
                                {errors.email && <div className='text-red-500 text-xs mt-1'>{errors.email}</div>}
                            </div>
                            <div className='mb-4'>
                                <div className='flex justify-between'>
                                    <label className='inline-block mb-2 text-xs font-medium text-gray-700 uppercase' htmlFor='password'>
                                        Password
                                    </label>
                                    <Link to='/forgot-password' className='no-underline cursor-pointer text-primary'>
                                        <small className='text-purple-600'>Forgot Password?</small>
                                    </Link>
                                </div>
                                <div className='relative flex flex-wrap items-stretch w-full'>
                                    <input
                                        type='password'
                                        id='password'
                                        className='relative flex-auto block px-3 py-2 text-sm border border-gray-400 rounded-md outline-none appearance-none cursor-text bg--100 focus:border-primary-500 focus:bg-white focus:text-gray-600 focus:shadow'
                                        name='password'
                                        onChange={handleChange}
                                        placeholder='············'
                                    />
                                </div>
                                {errors.password && <div className='text-red-500 text-xs mt-1'>{errors.password}</div>}
                            </div>
                            <div className='mb-4'>
                                <div className='block'>
                                    <input
                                        className='w-5 h-5 mt-1 mr-2 text-black align-top bg-no-repeat bg-contain border border-gray-300 rounded shadow appearance-none checked:bg-primary-500 focus:border-primary-500 focus:shadow'
                                        type='checkbox'
                                        id='remember-me'
                                    />
                                    <label className='inline-block' htmlFor='remember-me'>
                                        {' '}
                                        Remember Me{' '}
                                    </label>
                                </div>
                            </div>
                            {
                                success && (
                                    <div className='mb-4'>
                                        <div className='block'>
                                            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>
                                                <strong className='font-bold'>Well done!</strong>
                                                <span className='block sm:inline'> {success}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {/* display error div */}
                            {errors.general &&
                                
                                <div className='mb-4'>
                                    <div className='block'>
                                        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                                            <strong className='font-bold'>Holy smokes!</strong>
                                            <span className='block sm:inline'> {errors.general}</span>
                                        </div>
                                    </div>
                                </div>
                            }                
                            <div className='mb-4'>
                                <button
                                    className='grid w-full px-5 py-2 text-sm text-center bg-purple-600 text-white align-middle border rounded-md shadow cursor-pointer select-none border-primary-500 bg-primary-500 hover:border-primary-600 hover:bg-primary-600 hover:text-white focus:border-primary-600 focus:bg-primary-600 focus:text-white focus:shadow-none'
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className='mb-4 text-center'>
                            New on a platform ?
                            <Link to='/registration' className='no-underline cursor-pointer text-primary hover:text-primary-500'>
                                {' '}
                                Create an account{' '}
                            </Link>
                        </p>
                    </div>
                </div>
                {/* /Register */}
            </div>
        </div>
    );
};

export default Login;