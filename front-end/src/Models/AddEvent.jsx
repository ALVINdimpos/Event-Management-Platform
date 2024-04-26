import React, { useState } from 'react';

const AddEvent = ({ onAddEvent, buttonName }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        venue: '',
        locationPoint: '',
        startDate: '',
        endDate: '',
        imageUrl: '',
        ticketsAvailable: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear previous error messages when the user starts typing again
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation checks
        const { title, description, category, venue, locationPoint, startDate, endDate, imageUrl, ticketsAvailable } = formData;
        const newErrors = {};
        if (!title) {
            newErrors.title = 'Title is required';
        }
        if (!description) {
            newErrors.description = 'Description is required';
        }
        if (!category) {
            newErrors.category = 'Category is required';
        }
        if (!venue) {
            newErrors.venue = 'Venue is required';
        }
        if (!locationPoint) {
            newErrors.locationPoint = 'Location Point is required';
        }
        if (!startDate) {
            newErrors.startDate = 'Start Date is required';
        }
        if (!endDate) {
            newErrors.endDate = 'End Date is required';
        }
        if (!imageUrl) {
            newErrors.imageUrl = 'Image URL is required';
        }
        if (!ticketsAvailable) {
            newErrors.ticketsAvailable = 'Tickets Available is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Call the onAddEvent function with the form data
        onAddEvent(formData);

        // Reset form fields
        setFormData({ title: '', description: '', category: '', venue: '', locationPoint: '', startDate: '', endDate: '', imageUrl: '', ticketsAvailable: '' });

        // Show success message
        setSuccess('Event added successfully!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-4 md:h-auto">
                <div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
            <h2 className="mb-4 text-2xl font-bold">Add Event</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 mb-4">
                            <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-600">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.title && <div className='mt-1 text-xs text-red-500'>{errors.title}</div>}
                        </div>
                        <div className="col-span-2 mb-4">
                            <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-600">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            ></textarea>
                            {errors.description && <div className='mt-1 text-xs text-red-500'>{errors.description}</div>}
                        </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-600">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.category && <div className='mt-1 text-xs text-red-500'>{errors.category}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="venue" className="block mb-2 text-sm font-semibold text-gray-600">
                        Venue
                    </label>
                    <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.venue && <div className='mt-1 text-xs text-red-500'>{errors.venue}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="locationPoint" className="block mb-2 text-sm font-semibold text-gray-600">
                        Location Point
                    </label>
                    <input
                        type="text"
                        id="locationPoint"
                        name="locationPoint"
                        value={formData.locationPoint}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.locationPoint && <div className='mt-1 text-xs text-red-500'>{errors.locationPoint}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-semibold text-gray-600">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.startDate && <div className='mt-1 text-xs text-red-500'>{errors.startDate}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block mb-2 text-sm font-semibold text-gray-600">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.endDate && <div className='mt-1 text-xs text-red-500'>{errors.endDate}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-semibold text-gray-600">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.imageUrl && <div className='mt-1 text-xs text-red-500'>{errors.imageUrl}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="ticketsAvailable" className="block mb-2 text-sm font-semibold text-gray-600">
                        Tickets Available
                    </label>
                    <input
                        type="number"
                        id="ticketsAvailable"
                        name="ticketsAvailable"
                        value={formData.ticketsAvailable}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.ticketsAvailable && <div className='mt-1 text-xs text-red-500'>{errors.ticketsAvailable}</div>}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {buttonName}
                </button>
                {success && <div className='mt-1 text-xs text-green-500'>{success}</div>}
            </form>
            </div>
            </div>
        </div>
    );
};

export default AddEvent;
