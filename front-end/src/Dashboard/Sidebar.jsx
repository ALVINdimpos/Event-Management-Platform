import React from 'react';
import { FiHome, FiBook, FiUsers } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div className="flex flex-col justify-between w-64 h-screen text-white bg-gray-800">
            <div>
                <div className="flex items-center p-4 space-x-2 text-2xl font-semibold">
                    <FiBook className="text-white" size={24} />
                    <span>Dashboard</span>
                </div>
                <nav>
                    <ul className="py-4 space-y-2">
                        <li className="pl-4 transition duration-300 hover:bg-gray-700">
                            <a href="#" className="flex items-center">
                                <FiHome className="text-white" size={20} />
                                <span className="ml-2">Home</span>
                            </a>
                        </li>
                        <li className="pl-4 transition duration-300 hover:bg-gray-700">
                            <a href="#" className="flex items-center">
                                <FiBook className="text-white" size={20} />
                                <span className="ml-2">Event</span>
                            </a>
                        </li>
                        <li className="pl-4 transition duration-300 hover:bg-gray-700">
                            <a href="#" className="flex items-center">
                                <FiUsers className="text-white" size={20} />
                                <span className="ml-2">Booking</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="pb-4 text-center">
                <p className="text-sm text-gray-400">&copy; 2024 Alvin Coder</p>
            </div>
        </div>
    );
};

export default Sidebar;