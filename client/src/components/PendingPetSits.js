import React, { useEffect, useState } from "react";
import PendingAppointmentCard from "./PendingAppointmentCard";
import ActiveAppointmentCard from "./ActiveAppointmentCard";
import '../App.css';

export default function PendingPetSits({ petSitterOrClient, user }) {

    const headerStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#9e9e9e',
        width: '100%',
        fontSize: '36px',
        lineHeight: '1.2',
      };

    const [appointments, setAppointments] = useState([])
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [activeAppointments, setActiveAppointments] = useState([])

    useEffect(() => {
        fetch("/appointments").then((response) => {
            if (response.ok) {
                response.json().then((apts) => {
                    setAppointments(apts)

                    if(user.client){
                        let pendingApts = apts.filter((apt) => apt.client_id === petSitterOrClient.id && apt.accepted !== true && apt.declined !== true && apt.canceled !== true)

                        let activeApts = apts.filter((apt) => apt.client_id === petSitterOrClient.id && apt.accepted === true && apt.completed !== true  && apt.canceled !== true)

                        setPendingAppointments(pendingApts)
                        setActiveAppointments(activeApts)
                    } else {
                        let pendingApts = apts.filter((apt) => apt.petsitter_id === petSitterOrClient.id && apt.accepted !== true && apt.declined !== true && apt.canceled !== true)
    
                        let activeApts = apts.filter((apt) => apt.petsitter_id === petSitterOrClient.id && apt.accepted === true && apt.completed === null  && apt.canceled !== true)
    
                        setPendingAppointments(pendingApts)
                        setActiveAppointments(activeApts)
                    }
                });
            }
        });
    }, [petSitterOrClient, user]);

    function updatePendingAppointments(acceptedAppointment) {

        let newPendingAppointments = pendingAppointments.filter((apt) => apt.declined !== true && apt.id !== acceptedAppointment.id )

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
                    <ActiveAppointmentCard user={user} petSitterOrClient={petSitterOrClient} updateActiveAppointments={updateActiveAppointments} appointment={appointment} key={appointment.id} />
                ))}
                {pendingAppointments.map((appointment) => (
                    <PendingAppointmentCard user={user} petSitterOrClient={petSitterOrClient} updatePendingAppointments={updatePendingAppointments} appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="emptyRequestsDiv"></div>
        )
    }
}