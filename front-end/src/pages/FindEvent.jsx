/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import {
    useGetAllEventsQuery,
    useSearchEventsQuery,
    useSearchByCategoryQuery,
    useSearchByTitleQuery,
    useSearchByDateQuery,
    useGetEventsNearMeQuery,
} from '../redux/api/apiSlice';

const FindEventPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const eventsPerPage = 3; // Number of events to display per page

    // API query hooks
    const { data: eventsData, error, isLoading: allEventsLoading } = useGetAllEventsQuery({ page: currentPage, limit: eventsPerPage });
    const { data: categoryEventsData, error: categoryError, isLoading: categoryLoading } = useSearchByCategoryQuery(
        searchCategory
    );

    useEffect(() => {
        // Update data based on categoryEventsData when it's available and not loading
        if (!categoryLoading && categoryEventsData) {
            setData(categoryEventsData?.data?.events);
            setIsLoading(false);
        }
    }, [categoryEventsData, categoryLoading]);
    
    useEffect(() => {
        // Update data based on eventsData when it's available and not loading
        if (!allEventsLoading && eventsData) {
            setData(eventsData?.data?.allEvents);
            setIsLoading(false);
        }
    }, [eventsData, allEventsLoading]);
    useEffect(() => {
       if (searchKey=== '' ) {
            setData(eventsData?.data?.allEvents);
       } else {
           setIsLoading(true);
           setData(categoryEventsData?.data?.events);
       }
    }, [searchKey, searchCategory, searchDate]);

    useEffect(() => {
        if (error || categoryError) {
            console.log('Error fetching events:', error?.message || categoryError?.message);
        }
    }, [error, categoryError]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
   const totalEvents = data?.length || 0;  
    const handleNextClick = () => {
        if (currentPage < Math.ceil(totalEvents / eventsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
 
    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state when searching
        // Perform search based on searchKey, searchCategory, and searchDate
        // You can use the appropriate API query hook here
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Find Events</h1>

                {/* Search Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="mb-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
                >
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <select
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                        <option value="">All Categories</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Food">Food</option>
                        <option value="Art">Art</option>
                        <option value="Other">Other</option>
                        <option value="Technology">Technology</option>
                        <option value="Science">Science</option>
                        <option value="Business">Business</option>
                        <option value="Health">Health</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Travel">Travel</option>
                        <option value="Film">Film</option>
                        <option value="Education">Education</option>
                    </select>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        className="mt-4 md:mt-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Search
                    </button>
                </form>
                {/* Location Search Button */}
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Find Events Near Me
                </button>
                {/* Event Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                    {isLoading ? ( // Display loading state
                        <div>Loading...</div>
                    ) : (
                            data?.slice((currentPage - 1) * 3, currentPage * 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    )}
                
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalEvents / eventsPerPage)}
                    handlePrevClick={handlePrevClick}
                    handleNextClick={handleNextClick}
                />
            </div>
        </>
    );
};

export default FindEventPage;
