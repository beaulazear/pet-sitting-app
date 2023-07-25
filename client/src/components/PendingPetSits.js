import React, { useEffect, useState } from "react";
import PendingAppointmentCard from "./PendingAppointmentCard";
import '../App.css';

export default function PendingPetSits({ user, petSitter }) {

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch("/appointments")
            .then((resp) => resp.json())
            .then((apts) => {
                let newApts = apts.filter((apt) => apt.petsitter_id === petSitter.id)
                console.log(newApts)
                setAppointments(newApts)}
                )
    }, [])

    if (appointments.length > 0) {
        return (
            <div>
                <h2 className="pageHeader">Pending Pet Sit Requests:</h2>
                {appointments.map((appointment) => (
                    <PendingAppointmentCard appointment={appointment} key={appointment.id} />
                ))}
            </div>
        )
    } else {
        return (
            <h2 className="pageHeader">No pending appointments.</h2>
        )
    }
}