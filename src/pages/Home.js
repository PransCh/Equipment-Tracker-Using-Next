"use client";
import { useState } from 'react';
import Footer from "@/app/components/Footer";
import withAuth from '@/app/components/auth';
import Dashboard from '@/app/components/Dashboard';
import Header from '@/app/components/Header';
import EquipmentList from '@/app/components/EquipmentList';
import Sidebar from '@/app/components/Sidebar';

function RegisterPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <Sidebar />
            <Dashboard />
            <EquipmentList searchTerm={searchTerm} />
            <Footer />
        </div>
    );
}

export default withAuth(RegisterPage);