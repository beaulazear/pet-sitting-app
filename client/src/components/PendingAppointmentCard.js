import React from "react";

export default function PendingAppointmentCard({ appointment }) {

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





    console.log(appointment)

    return (
        <div id="petSitterProfile" style={styles.petSitterProfile}>
            <img height="400" width="300" style={styles.image}></img>
            <h2>Pending Request:</h2>
            <p><b>Client Name:</b> {appointment.client.full_name}</p>
            <p><b>Total Price:</b> $</p>
            <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
            <button className="acceptButton">Accept Pet Sit</button>
            <button className="declineButton">Decline Pet Sit</button>
        </div>
    )
}