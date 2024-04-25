import React from 'react';

const EventCard = ({ event }) => {
    const {
        title,
        description,
        category,
        venue,
        startDate,
        endDate,
        imageUrl,
        ticketsAvailable,
    } = event;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{category}</span>
                <span className="text-sm text-gray-700">{venue}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Start Date: {new Date(startDate).toLocaleDateString()}</span>
                <span className="text-sm text-gray-700">End Date: {new Date(endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">Tickets available: {ticketsAvailable}</span>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">Book Now</button>
            </div>
        </div>
    );
};

export default EventCard;
