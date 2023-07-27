import React from "react";

export default function PendingAppointmentCard({ appointment, updatePendingAppointments, user }) {

    function totalPriceCalculator(startDate, endDate) {

        const start = new Date(startDate);
        const end = new Date(endDate);

        const differenceMs = end - start;

        const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

        const totalPrice = days * appointment.petsitter.day_rate

        return totalPrice
    }

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
        // window.alert("Appointment has been accepted!")
    }

    function handleCancel() {
        fetch(`/appointments/${appointment.id}/canceled`)
            .then((resp) => resp.json())
            .then((apt) => updatePendingAppointments(apt))
            // window.alert("Appointment has been cancelled")
    }

    function handleDecline() {
        fetch(`/appointments/${appointment.id}/declined`)
            .then((resp) => resp.json())
            .then((apt) => updatePendingAppointments(apt))
        // window.alert("Appointment has been declined!")
    }

    if (user.id === appointment.petsitter.user_id) {
        return (
            <div id="petSitterProfile" style={styles.petSitterProfile}>
                <img height="400" width="300" src={appointment.client.pet_photo} alt="the pet of the appointment" style={styles.image}></img>
                <h2>Pending Request:</h2>
                <p><b>Client Name:</b> {appointment.client.full_name}</p>
                <p><b>Total Price:</b> ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
                <p><b>Start Date:</b> {appointment.start_date}</p>
                <p><b>End Date:</b> {appointment.end_date}</p>
                <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
                <button onClick={handleAccept} className="acceptButton" value="Accepted">Accept Pet Sit</button>
                <button onClick={handleDecline} className="declineButton" value="Declined">Decline Pet Sit</button>
            </div>
        )
    } else {
        return (
            <div id="petSitterProfile" style={styles.petSitterProfile}>
                <img height="400" width="300" src={appointment.petsitter.photo} alt="the petsitter" style={styles.image}></img>
                <h2>Pending Pet Sit Request:</h2>
                <p><b>Pet Sitter Requested:</b> {appointment.petsitter.full_name}</p>
                <p><b>Total Price:</b> ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
                <p><b>Start Date:</b> {appointment.start_date}</p>
                <p><b>End Date:</b> {appointment.end_date}</p>
                <p><b>Appointment Information:</b>{appointment.appointment_information}</p>
                <button onClick={handleCancel} className="declineButton" value="Cancelled">Cancel Pet Sit Request</button>
            </div>
        )
    }
}
