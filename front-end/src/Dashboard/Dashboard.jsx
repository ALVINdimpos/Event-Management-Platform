import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EventsTable from "./EventTable";
import AddEventModel from "../Models/AddEvent";
import UpdateEventModel from "../Models/UpdateEvent";
import DeleteEventModel from "../Models/DeleteEvent";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const navigate = useNavigate();
    // Function to open the Delete User Modal
    const openDeleteModal = (id) => {
        localStorage.setItem('deleteUserId', id);
        setDeleteModalOpen(true);
    };

    // Function to open the Edit User Modal
    const openEditModal = (id) => {
        localStorage.setItem('editUserId', id);
        setEditModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    // Function to close all modals
    const closeModals = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
    };
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <Header onLogout={handleLogout} />

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container px-6 py-8 mx-auto">
                        <div className="flex-1 p-8">
                            <EventsTable
                                onOpenDeleteModal={openDeleteModal}
                                onOpenEditModal={openEditModal}
                            />
                            {isDeleteModalOpen && <DeleteEventModel onCancel={closeModals} />}
                            {isEditModalOpen && <UpdateEventModel onClose={closeModals} />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;