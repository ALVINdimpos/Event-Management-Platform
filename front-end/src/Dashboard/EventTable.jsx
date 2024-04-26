import React, { useEffect, useState } from 'react';
import { useGetEventsByUserIdQuery } from '../redux/api/apiSlice';
import AddEventModel from "../Models/AddEvent";

const EventsTable = ({ onOpenDeleteModal, onOpenEditModal }) => {
    const { data: events, isLoading, error } = useGetEventsByUserIdQuery();
    const [showAddEventModal, setShowAddEventModal] = useState(false);

    const handleAddEventModalOpen = () => {
        setShowAddEventModal(true);
    };

    const handleAddEventModalClose = () => {
        setShowAddEventModal(false);
    };
    useEffect(() => {
        if (error) {
            console.log('Error fetching events:', error.message);
        }
    }, [error]);

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Oh no, there was an error</div>;
    }

    return (
        <div className="p-6 overflow-x-auto bg-white rounded-md shadow-md">
            <div className='flex justify-between'>
            <h2 className="mb-4 text-xl font-semibold">Events Table</h2>
                <button
                    onClick={handleAddEventModalOpen}
                    className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                >
                    Add Event
                </button>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Venue</th>
                        <th className="p-2 border">Location Point</th>
                        <th className="p-2 border">Start Date</th>
                        <th className="p-2 border">End Date</th>
                        <th className="p-2 border">Image URL</th>
                        <th className="p-2 border">Tickets Available</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events?.data?.userEvents?.map((event) => (
                        <tr key={event.id}>
                            <td className="p-2 border">{event.id}</td>
                            <td className="p-2 border">{event.title}</td>
                            <td className="p-2 border">{event.description}</td>
                            <td className="p-2 border">{event.category}</td>
                            <td className="p-2 border">{event.venue}</td>
                            <td className="p-2 border">{event.locationPoint}</td>
                            <td className="p-2 border">{event.startDate}</td>
                            <td className="p-2 border">{event.endDate}</td>
                            <td className="p-2 border">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="object-cover w-full h-40 rounded-md"
                                />
                            </td>
                            <td className="p-2 border">{event.ticketsAvailable}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => onOpenDeleteModal(event.id)}
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => onOpenEditModal(event.id)}
                                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
                                >
                                    Edit
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddEventModal && (
                <AddEventModel
                    buttonName="Add Event"
                    onAddEvent={handleAddEventModalClose}
                />
            )}
        </div>
    );
};

export default EventsTable;
