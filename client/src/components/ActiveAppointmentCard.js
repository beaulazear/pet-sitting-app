import React from "react";

export default function ActiveAppointmentCard({ appointment, updateActiveAppointments }) {

    // make it so acceping a pet sit automaticlly changes active apt state
    const styles = {
        activeAppointmentDiv: {
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


    function handleCancel() {
        fetch(`/appointments/${appointment.id}/canceled`)
            .then((resp) => resp.json())
            .then((apt) => updateActiveAppointments(apt))
    }

    return (
        <div id="activeAppointmentDiv" style={styles.activeAppointmentDiv}>
            <img height="400" width="300" src={appointment.client.pet_photo} style={styles.image}></img>
            <h2>Accepted Appointment:</h2>
            <p><b>Client Name:</b> {appointment.client.full_name}</p>
            <p><b>Total Price:</b> $</p>
            <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
            <button onClick={handleCancel} className="cancelButton" value="Cancel">Cancel Pet Sit</button>
        </div>
    )
}