import React, { useEffect, useState } from "react";
import PendingAppointmentCard from "./PendingAppointmentCard";
import ActiveAppointmentCard from "./ActiveAppointmentCard";
import ClientPreviousSitters from "./ClientPreviousSitters";
import '../App.css';

const headerStyle = {
    paddingTop: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2',
};

export default function ClientPendingAppointments({ updateClient, client, user }) {

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

    function updatePendingAppointments(updatedAppointment) {

        if (updatedAppointment.accepted === true) {
            let newPendingAppointments = pendingAppointments.filter((apt) => apt.id !== updatedAppointment.id)

            setPendingAppointments(newPendingAppointments)
            
            let newActiveApts = [...activeAppointments, updatedAppointment]

            setActiveAppointments(newActiveApts)
        } else if (updatedAppointment.declined === true) {
            let newPendingAppointments = pendingAppointments.filter((apt) => apt.id !== updatedAppointment.id)

            setPendingAppointments(newPendingAppointments)
        } else {
            let newPendingAppointments = pendingAppointments.map((apt) => {
                if (apt.id === updatedAppointment.id) {
                    return { ...apt, ...updatedAppointment }
                } else {
                    return apt
                }
            })

            setPendingAppointments(newPendingAppointments)
        }

        let newApts = appointments.map((apt) => {
            if (apt.id === updatedAppointment.id) {
                return { ...apt, ...updatedAppointment }
            } else {
                return apt
            }
        })
        setAppointments(newApts)
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

    function newRequestFromClientPage(newApt) {
        let newPendingAppointments = [...pendingAppointments, newApt]
        setPendingAppointments(newPendingAppointments)
    }

    function deleteAppointmentRequest(deletedRequestId, newClient) {
        let newPendingRequests = pendingAppointments.filter((apt) => apt.id !== deletedRequestId)
        setPendingAppointments(newPendingRequests)
        updateClient(newClient)
    }

    if (pendingAppointments.length > 0 || activeAppointments.length > 0) {
        return (
            <div>
                <h2 style={headerStyle}>Active Appointments / Requests:</h2>
                {activeAppointments.map((appointment) => (
                    <ActiveAppointmentCard user={user} client={client} updateActiveAppointments={updateActiveAppointments} appointment={appointment} key={appointment.id} />
                ))}
                {pendingAppointments.map((appointment) => (
                    <PendingAppointmentCard deleteAppointmentRequest={deleteAppointmentRequest} user={user} client={client} updatePendingAppointments={updatePendingAppointments} appointment={appointment} key={appointment.id} />
                ))}
                <ClientPreviousSitters newRequestFromClientPage={newRequestFromClientPage} client={client} user={user} />
            </div>
        )
    } else {
        return (
            <div>
                <h2 style={headerStyle}>No pending requests / active pet sits</h2>
                <ClientPreviousSitters newRequestFromClientPage={newRequestFromClientPage} client={client} user={user} />
            </div>
        )
    }
}