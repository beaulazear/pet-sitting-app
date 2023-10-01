import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/user";
import PendingAppointmentCard from "./PendingAppointmentCard";
import ActiveAppointmentCard from "./ActiveAppointmentCard";
import '../App.css';

const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2',
};

const welcomeMessageStyles = {
    fontFamily: 'Helvetica, sans-serif',
    maxWidth: '340px',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
};

export default function PendingAppointments() {

    const { user } = useContext(UserContext)
    const petsitter = user.petsitter

    const [appointments, setAppointments] = useState([])
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [activeAppointments, setActiveAppointments] = useState([])

    useEffect(() => {
        fetch("/appointments").then((response) => {
            if (response.ok) {
                response.json().then((apts) => {
                    setAppointments(apts)

                    let pendingApts = apts.filter((apt) => apt.petsitter_id === petsitter.id && apt.accepted !== true && apt.declined !== true && apt.canceled !== true)
                    setPendingAppointments(pendingApts)

                    let activeApts = apts.filter((apt) => apt.petsitter_id === petsitter.id && apt.accepted === true && apt.completed !== true && apt.canceled !== true)
                    setActiveAppointments(activeApts)
                });
            }
        });
    }, [petsitter.id]);

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
                <div style={welcomeMessageStyles}>
                    <div style={headerStyle}>Active Appointments & Pedning Requests</div>
                </div>
                {activeAppointments.map((appointment) => (
                    <ActiveAppointmentCard updateActiveAppointments={updateActiveAppointments} appointment={appointment} key={appointment.id} />
                ))}
                {pendingAppointments.map((appointment) => (
                    <PendingAppointmentCard updatePendingAppointments={updatePendingAppointments} appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div style={welcomeMessageStyles}>
                <div style={headerStyle}>New requests from clients will be displayed here.
                    <br></br><br></br>
                    Make sure your account is active so clients can find you on the petsitters page.</div>
            </div>
        )
    }
}