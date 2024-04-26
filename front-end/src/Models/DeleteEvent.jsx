import React from 'react';

const DeleteNote = ({ onDeleteNote, buttonName }) => {
    return (
        <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Delete Note</h2>
            <p className="text-gray-600">Are you sure you want to delete this note?</p>
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={onDeleteNote}
                >
                    {buttonName ? buttonName : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default DeleteNote;