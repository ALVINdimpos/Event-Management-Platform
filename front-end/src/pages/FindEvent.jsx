/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import ModalContent from '../components/ModalContent';
import {
    useGetAllEventsQuery,
    useSearchEventsQuery,
    useSearchByCategoryQuery,
    useSearchByTitleQuery,
    useSearchByDateQuery,
    useGetEventsNearMeQuery,
    useCreateBookingMutation
} from '../redux/api/apiSlice';

const FindEventPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [createBooking, { isSuccess, isError }] = useCreateBookingMutation();
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
    const handleBookNow = (eventId, numTickets) => {
        createBooking({ eventId, numTickets })
            .then(() => {
                setShowSuccessModal(true);
                setShowModal(true);
                
                setTimeout(() => {
                    setShowModal(false);
                }, 1000);
            
            })
            .catch(() => {
                setShowErrorModal(true);
                setShowModal(true);
                
                setTimeout(() => {
                    setShowModal(false);
                }, 1000);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state when searching
        // Perform search based on searchKey, searchCategory, and searchDate
        // You can use the appropriate API query hook here
    };
    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <Header />
            <div className="container px-4 py-8 mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-center">Find Events</h1>

                {/* Search Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="flex flex-col items-center justify-center mb-8 space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                >
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg md:w-auto focus:outline-none focus:border-purple-500"
                    />
                    <select
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg md:w-auto focus:outline-none focus:border-purple-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg md:w-auto focus:outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 mt-4 text-white transition duration-300 bg-purple-600 rounded-lg md:mt-0 hover:bg-purple-700"
                    >
                        Search
                    </button>
                </form>
                {/* Location Search Button */}
                <button
                    type="button"
                    className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Find Events Near Me
                </button>
                {/* Event Cards */}
                <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-3">
                    {isLoading ? ( // Display loading state
                        <div>Loading...</div>
                    ) : (
                            data?.slice((currentPage - 1) * 3, currentPage * 3).map((event) => (
                                <EventCard key={event.id} event={event} handleBookNow={handleBookNow} />
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
                {/* Success and Error Modals */}
                {isSuccess && showModal && (
                    <ModalContent type='success' onClose={closeModal} />
                )}
                {isError && showModal && (
                    <ModalContent type='error' onClose={closeModal} />
                )}
            </div>
        </>
    );
};

export default FindEventPage;
