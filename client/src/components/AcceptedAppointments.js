import React, { useEffect, useState } from "react";
import ActiveAppointmentCard from "./ActiveAppointmentCard";
import '../App.css';

export default function AcceptedAppointments({ petSitter }) {

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch("/appointments")
            .then((resp) => resp.json())
            .then((apts) => {
                let newApts = apts.filter((apt) => apt.petsitter_id === petSitter.id && apt.accepted === true && apt.completed === null)
                setAppointments(newApts)
            })
    }, [])

    function updateAppointments(completedAppointment) {
        const updatedAppointments = appointments.filter((apt) => apt.id !== completedAppointment.id)
        setAppointments(updatedAppointments)
    }

    if (appointments.length > 0) {
        return (
            <div>
                <h2 className="pageHeader">Active Appointments:</h2>
                {appointments.map((appointment) => (
                    <ActiveAppointmentCard updateAppointments={updateAppointments} appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div style={headerStyle}>No pending requests / active pet sits</div>
        )
    }
}