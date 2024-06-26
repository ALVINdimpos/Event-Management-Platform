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
            <div className="relative overflow-hidden bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Eventify Image"
                    className="absolute top-0 left-0 z-0 object-cover w-full h-96 filter blur-sm"
                />
                <div className="container relative z-10 px-4 py-24 mx-auto text-white">
                    <h1 className="mb-4 text-4xl font-bold text-center">Welcome to Eventify</h1>
                    <p className="mb-8 text-lg text-center">
                        Eventify is a platform to create, manage, and share events. You can create events, manage
                        them, and share them with others. You can also see events created by others and attend
                        them.
                    </p>
                </div>
            </div>
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
