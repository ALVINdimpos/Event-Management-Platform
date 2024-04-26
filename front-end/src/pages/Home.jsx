import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import { useGetAllEventsQuery, useCreateBookingMutation } from '../redux/api/apiSlice';
import ModalContent from '../components/ModalContent';
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { data: events, error, isLoading } = useGetAllEventsQuery({ page: currentPage, limit: 3 });
    const [createBooking, { isSuccess, isError }] = useCreateBookingMutation();

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBookNow = (eventId, numTickets) => {
        createBooking({ eventId, numTickets })
    };
    useEffect(() => {
        if (isSuccess) {
            setShowSuccessModal(true);
            setShowModal(true);
           // load win but after  1 sec
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
        }
        if (isError) {
            setShowErrorModal(true);
            setShowModal(true);
        }
    }
        , [isSuccess, isError]);
    
    const closeModal = () => {
        setShowModal(false);
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <Header />
            <div className="container px-4 py-8 mx-auto">
                <h1 className="mb-4 text-4xl font-bold text-center">Upcoming Events</h1>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {events?.data?.allEvents.slice((currentPage - 1) * 3, currentPage * 3).map((event) => (
                        <EventCard key={event.id} event={event} handleBookNow={handleBookNow} />
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={events?.data?.totalEvents}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
            />
            {isSuccess && showModal && (
                <ModalContent type='success' onClose={closeModal} />
            )}
            {isError && showModal && (
                <ModalContent type='error' onClose={closeModal} />
            )}
        </div>
    );
}

export default Home;
