"use client";
import { useState } from 'react';
import Footer from "@/app/components/Footer";
import withAuth from '@/app/components/auth';
import Dashboard from '@/app/components/Dashboard';
import Header from '@/app/components/Header';
import EquipmentList from '@/app/components/EquipmentList';
import Sidebar from '@/app/components/Sidebar';

function RegisterPage() {
  const [showCalendar, setShowCalendar] = useState(false);
    const equipmentID = 1; // Replace with actual equipment ID

    const handleViewCalendar = () => {
        setShowCalendar(true);
    };
  return (
    <div>
      <Header/>
      <Sidebar/>
      <Dashboard />
      <EquipmentList/>
      <Footer/>
    </div>
  );
}

export default withAuth(RegisterPage);