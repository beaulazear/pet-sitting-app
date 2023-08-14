import React from "react";

const styles = {
    activeAppointmentDiv: {
        backgroundColor: '#C8E6C9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
    },
    imageWrapper: {
        width: '150px',
        height: '150px',
        margin: '0 auto 20px',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    heading: {
        fontSize: '24px',
        margin: '0',
        color: '#333',
    },
    subheading: {
        fontSize: '18px',
        margin: '10px 0',
        color: '#666',
    },
    cancelButton: {
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'red',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default function ActiveAppointmentCard({ appointment, updateActiveAppointments, user }) {

    function handleCancel() {
        fetch(`/appointments/${appointment.id}/canceled`)
            .then((resp) => resp.json())
            .then((apt) => {
                console.log(apt)
                updateActiveAppointments(apt)
            })
    }

    function totalPriceCalculator(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceMs = end - start;
        const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
        const totalPrice = days * appointment.petsitter.day_rate;
        return totalPrice;
    }

    const isPetsitter = user.id === appointment.petsitter.user_id

    console.log(isPetsitter)
    console.log(appointment)

    if (isPetsitter) {
        return (
            <div style={styles.activeAppointmentDiv}>
                <div style={styles.imageWrapper}>
                    <img height="150" width="150" src={appointment.client.photo} style={styles.image} alt="Client's Pet" />
                </div>
                <h2 style={styles.heading}>Accepted Appointment:</h2>
                <p style={styles.subheading}>Client Name: {appointment.client.full_name}</p>
                <p style={styles.subheading}>Total Price: ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
                <p style={styles.subheading}>Start Date: {appointment.start_date}</p>
                <p style={styles.subheading}>End Date: {appointment.end_date}</p>
                <p style={styles.subheading}>Pet Information: {appointment.client.pet_information}</p>
                <button onClick={handleCancel} className="declineButton">Cancel Pet Sit</button>
            </div>
        );
    } else {
        return (
            <div style={styles.activeAppointmentDiv}>
                <div style={styles.imageWrapper}>
                    <img height="150" width="150" src={appointment.petsitter.photo} alt="Petsitter" style={styles.image} />
                </div>
                <h2 style={styles.heading}>Accepted Appointment:</h2>
                <p style={styles.subheading}>Pet Sitter Name: {appointment.petsitter.full_name}</p>
                <p style={styles.subheading}>Total Price: ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
                <p style={styles.subheading}>Start Date: {appointment.start_date}</p>
                <p style={styles.subheading}>End Date: {appointment.end_date}</p>
                <p style={styles.subheading}>Pet Information: {appointment.client.pet_information}</p>
                <button onClick={handleCancel} className="declineButton">Cancel Pet Sit</button>
            </div>
        );
    }
}
