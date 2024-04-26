import React from 'react';

const EventCard = ({ event, handleBookNow }) => {
    const {
        id,
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
        <div className="p-6 bg-white rounded-lg shadow-md">
            <img src={imageUrl} alt={title} className="object-cover w-full h-40 mb-4 rounded-md" />
            <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
            <p className="mb-4 text-sm text-gray-600">{description}</p>
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
                <button
                    className="px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
                    onClick={() => handleBookNow(id, 1)} 
                >
                    Book Now
                </button>

            </div>
        </div>
    );
};

export default EventCard;
