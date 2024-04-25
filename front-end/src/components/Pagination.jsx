import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePrevClick, handleNextClick }) => {
    return (
        <div className="flex justify-center my-8">
            <button
                className={`bg-gray-800 text-white py-2 px-4 rounded-l hover:bg-gray-700 transition duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                onClick={handlePrevClick}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <span className="bg-gray-800 text-white py-2 px-4">{`${currentPage} / ${totalPages}`}</span>
            <button
                className={`bg-gray-800 text-white py-2 px-4 rounded-r hover:bg-gray-700 transition duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
