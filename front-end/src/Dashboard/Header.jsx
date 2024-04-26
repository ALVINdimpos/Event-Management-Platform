// Header.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Header = ({ onSearch, onLogout }) => {
    const navigate = useNavigate()
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <header className="flex items-center justify-between p-4 text-white bg-blue-500">
            <h1 className="text-2xl font-bold md:text-3xl ">Event App</h1>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search for event..."
                    className="w-64 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-96 text-slate-900"
                />
            </div>

            <div className="flex items-center">
                {/* User Avatar */}
                <div className="relative mr-4">
                    <FaUserCircle
                        size={30}
                        className="cursor-pointer"
                        onClick={toggleDropdown}
                    />

                    {isDropdownOpen && (
                        <div className="absolute right-0 flex p-4 text-black bg-white rounded-md shadow-md top-10">
                            <ul className="flex flex-col w-40 gap-2 "
                            >
                                <li className="cursor-pointer" onClick={
                                    () => {

                                        navigate('/new-password');
                                    }
                                }>
                                    Change Password
                                </li>
                                <li className="cursor-pointer" onClick={
                                    () => {
                                        navigate('/new-password');
                                    }
                                }>
                                    edit profile
                                </li>
                                <li className="cursor-pointer" onClick={onLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <span className="hidden md:block">
                    {user?.userFistName}
                </span>
            </div>
        </header>
    );
};

export default Header;