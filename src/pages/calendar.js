"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchMaintenanceDetails = async () => {
            try {
                const response = await fetch(`/api/auth/getMaintenanceByEquipment`);
                const data = await response.json();
                console.log('Fetched maintenance data:', data); // Debugging log
                const formattedEvents = data.map(schedule => {
                    const startDate = new Date(schedule.maintenanceDate);
                    const endDate = new Date(startDate);
                    endDate.setMinutes(startDate.getMinutes() + schedule.duration);
                    return {
                        title: schedule.maintenanceType,
                        start: startDate,
                        end: endDate,
                        description: schedule.remarks,
                    };
                });
                console.log('Formatted events:', formattedEvents); // Debugging log
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching maintenance details:', error);
            }
        };

        fetchMaintenanceDetails();
    }, []);

    const handleCloseCalendar = () => {
        window.history.back();
    };

    return (
        <div className="calendar-page">
            <button className="close-button" onClick={handleCloseCalendar}>Close Calendar</button>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </div>
    );
};

export default CalendarPage;