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
    lineHeight: '1.2',
};

export default function ClientPendingAppointments({ client, user }) {


    const [appointments, setAppointments] = useState([])
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [activeAppointments, setActiveAppointments] = useState([])

    useEffect(() => {
        fetch("/appointments").then((response) => {
            if (response.ok) {
                response.json().then((apts) => {
                    setAppointments(apts)

                    let pendingApts = apts.filter((apt) => apt.client_id === user.client.id && apt.accepted !== true && apt.declined !== true && apt.canceled !== true)

                    let activeApts = apts.filter((apt) => apt.client_id === user.client.id && apt.accepted === true && apt.completed !== true && apt.canceled !== true)

                    setPendingAppointments(pendingApts)
                    setActiveAppointments(activeApts)
                });
            }
        });
    }, [client, user]);

    function updatePendingAppointments(acceptedAppointment) {

        let newPendingAppointments = pendingAppointments.filter((apt) => apt.declined !== true && apt.id !== acceptedAppointment.id)

        setPendingAppointments(newPendingAppointments)

        let newApts = appointments.map((apt) => {
            if (apt.id === acceptedAppointment.id) {
                return { ...apt, ...acceptedAppointment }
            } else {
                return apt
            }
        })

        setAppointments(newApts)

        if (acceptedAppointment.accepted === true) {
            let newActiveApts = [...activeAppointments, acceptedAppointment]
            console.log(newActiveApts)
            setActiveAppointments(newActiveApts)
        }
    }

    function updateActiveAppointments(acceptedAppointment) {

        let newActiveAppointments = activeAppointments.filter((apt) => apt.id !== acceptedAppointment.id)

        setActiveAppointments(newActiveAppointments)

        let newApts = appointments.map((apt) => {
            if (apt.id === acceptedAppointment.id) {
                return { ...apt, ...acceptedAppointment }
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
                    <ActiveAppointmentCard user={user} client={client} updateActiveAppointments={updateActiveAppointments} appointment={appointment} key={appointment.id} />
                ))}
                {pendingAppointments.map((appointment) => (
                    <PendingAppointmentCard user={user} client={client} updatePendingAppointments={updatePendingAppointments} appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="emptyRequestsDiv"></div>
        )
    }
}