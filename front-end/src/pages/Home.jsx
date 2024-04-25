import React, { useState } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import { useGetAllEventsQuery } from '../redux/api/apiSlice';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: events, error, isLoading } = useGetAllEventsQuery({ page: currentPage, limit: 3 });

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            
        }
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

  return (
      <>
          <Header />
          <div className="relative overflow-hidden bg-gray-900">
              <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Eventify Image"
                  className="w-full h-96 object-cover absolute top-0 left-0 z-0 filter blur-sm"
              />
              <div className="container mx-auto px-4 py-24 relative z-10 text-white">
                  <h1 className="text-4xl font-bold text-center mb-4">Welcome to Eventify</h1>
                  <p className="text-center text-lg mb-8">
                      Eventify is a platform to create, manage, and share events. You can create events, manage
                      them, and share them with others. You can also see events created by others and attend
                      them.
                  </p>
              </div>
          </div>
          <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-4">Upcoming Events</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {events?.data?.allEvents.slice((currentPage - 1) * 3, currentPage * 3).map((event) => (
                      <EventCard key={event.id} event={event} />
                  ))}
              </div>
          </div>
          <Pagination
              currentPage={currentPage}
              totalPages={events?.data?.totalEvents}
              handlePrevClick={handlePrevClick}
              handleNextClick={handleNextClick}
          />
         
      </>
  )
}

export default Home