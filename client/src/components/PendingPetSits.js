import React, { useEffect, useState } from "react";
import PendingAppointmentCard from "./PendingAppointmentCard";
import '../App.css';

export default function PendingPetSits({ appointments, updateAppointments, petSitter }) {

    function updateAppointments(acceptedAppointment) {
        pendingAppointments = appointments.filter((apt) => apt.id != acceptedAppointment.id)
        let newApts = appointments.map((apt) => {
            if (apt.id == acceptedAppointment.id) {
                return{ ...apt, ...acceptedAppointment}
            } else {
                return apt
            }
        })
        updateAppointments(newApts)
    }


    let pendingAppointments = appointments.filter((apt) => apt.petsitter_id === petSitter.id && apt.accepted === null && apt.declined === null)

    if (pendingAppointments.length > 0) {
        return (
            <div>
                <h2 className="pageHeader">Pending Pet Sit Requests:</h2>
                {pendingAppointments.map((appointment) => (
                    <PendingAppointmentCard updatePendingAppointments={updateAppointments} appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="emptyRequestsDiv"></div>
        )
    }
}