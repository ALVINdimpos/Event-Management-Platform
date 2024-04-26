import React, { useState, useEffect } from 'react';

const UpdateNote = ({ onUpdateNote, noteId, initialData, buttonName }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateNote(noteId, formData);
    };

    return (
        <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Update Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
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
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-2 text-sm font-semibold text-gray-600">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {buttonName}
                </button>
            </form>
        </div>
    );
};

export default UpdateNote;