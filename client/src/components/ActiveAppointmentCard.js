import React from "react";

export default function ActiveAppointmentCard({ appointment, updateActiveAppointments, petSitterOrClient, user }) {

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
            window.alert("Appointment has been cancelled")
    }

    function totalPriceCalculator(startDate, endDate) {

        const start = new Date(startDate);
        const end = new Date(endDate);

        const differenceMs = end - start;

        const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

        const totalPrice = days * appointment.petsitter.day_rate

        return totalPrice
    }

    if (user.id === appointment.petsitter.user_id) {
        return (
            <div id="activeAppointmentDiv" style={styles.activeAppointmentDiv}>
                <img height="400" width="300" src={appointment.client.pet_photo} style={styles.image}></img>
                <h2>Accepted Appointment:</h2>
                <p><b>Client Name:</b> {appointment.client.full_name}</p>
                <p><b>Total Price:</b> {totalPriceCalculator(appointment.start_date, appointment.end_date)} $</p>
                <p><b>Start Date:</b> {appointment.start_date}</p>
                <p><b>End Date:</b> {appointment.end_date}</p>
                <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
                <button onClick={handleCancel} className="declineButton" value="Cancel">Cancel Pet Sit</button>
            </div>
        )
    } else {
        return (
            <div id="activeAppointmentDiv" style={styles.activeAppointmentDiv}>
                <img height="400" width="300" src={appointment.client.pet_photo} style={styles.image}></img>
                <h2>Accepted Appointment:</h2>
                <p><b>Pet Sitter Name:</b> {appointment.petsitter.full_name}</p>
                <p><b>Total Price:</b> ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
                <p><b>Start Date:</b> {appointment.start_date}</p>
                <p><b>End Date:</b> {appointment.end_date}</p>
                <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
                <button onClick={handleCancel} className="declineButton" value="Cancel">Cancel Pet Sit</button>
            </div>
        )
    }

}