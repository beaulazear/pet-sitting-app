import React from "react";

export default function PendingAppointmentCard({ appointment, updatePendingAppointments }) {

    const styles = {
        petSitterProfile: {
            backgroundColor: '#f8f8f8',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '0 auto',
        },
        image: {
            display: 'block',
            margin: '0 auto',
            borderRadius: '8px',
        },

    };

    function handleAccept() {
        fetch(`/appointments/${appointment.id}/accepted`)
            .then((resp) => resp.json())
            .then((apt) => updatePendingAppointments(apt))
    }

    function handleDecline() {
        fetch(`/appointments/${appointment.id}/declined`)
            .then((resp) => resp.json())
            .then((apt) => updatePendingAppointments(apt))
    }

    return (
        <div id="petSitterProfile" style={styles.petSitterProfile}>
            <img height="400" width="300" src={appointment.client.pet_photo} style={styles.image}></img>
            <h2>Pending Request:</h2>
            <p><b>Client Name:</b> {appointment.client.full_name}</p>
            <p><b>Total Price:</b> $</p>
            <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
            <button onClick={handleAccept} className="acceptButton" value="Accepted">Accept Pet Sit</button>
            <button onClick={handleDecline} className="declineButton" value="Declined">Decline Pet Sit</button>
        </div>
    )
}