import React, { useEffect, useState } from "react";
import PendingAppointmentCard from "./PendingAppointmentCard";
import ActiveAppointmentCard from "./ActiveAppointmentCard";
import '../App.css';

const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2'
};

export default function PendingPetSits({ petSitter, user }) {

    const [appointments, setAppointments] = useState([])
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [activeAppointments, setActiveAppointments] = useState([])

    useEffect(() => {
        fetch("/appointments").then((response) => {
            if (response.ok) {
                response.json().then((apts) => {
                    setAppointments(apts)

                    let pendingApts = apts.filter((apt) => apt.petsitter_id === petSitter.id && apt.accepted !== true && apt.declined !== true && apt.canceled !== true)
                    setPendingAppointments(pendingApts)

                    let activeApts = apts.filter((apt) => apt.petsitter_id === petSitter.id && apt.accepted === true && apt.completed !== true && apt.canceled !== true)
                    setActiveAppointments(activeApts)
                });
            }
        });
    }, [petSitter, user]);

    function updatePendingAppointments(updatedAppointment) {

        let newPendingAppointments = pendingAppointments.filter((apt) => apt.declined !== true && apt.id !== updatedAppointment.id)
        setPendingAppointments(newPendingAppointments)

        let newApts = appointments.map((apt) => {
            if (apt.id === updatedAppointment.id) {
                return { ...apt, ...updatedAppointment }
            } else {
                return apt
            }
        })
        setAppointments(newApts)

        if (updatedAppointment.accepted === true) {
            let newActiveApts = [...activeAppointments, updatedAppointment]
            setActiveAppointments(newActiveApts)
        }
    }

    function updateActiveAppointments(updatedAppointment) {

        let newActiveAppointments = activeAppointments.filter((apt) => apt.id !== updatedAppointment.id)
        setActiveAppointments(newActiveAppointments)

        let newApts = appointments.map((apt) => {
            if (apt.id === updatedAppointment.id) {
                return { ...apt, ...updatedAppointment }
            } else {
                return apt
            }
        })
        setAppointments(newApts)
    }

    if (pendingAppointments.length > 0 || activeAppointments.length > 0) {
        return (
            <div>
                <h2 style={headerStyle}>Active Appointments / Requests:</h2>
                {activeAppointments.map((appointment) => (
                    <ActiveAppointmentCard user={user} petSitter={petSitter} updateActiveAppointments={updateActiveAppointments} appointment={appointment} key={appointment.id} />
                ))}
                {pendingAppointments.map((appointment) => (
                    <PendingAppointmentCard user={user} petSitter={petSitter} updatePendingAppointments={updatePendingAppointments} appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div style={headerStyle}>No pending requests / active pet sits</div>
        )
    }
}