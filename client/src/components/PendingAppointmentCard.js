import React from "react";

const styles = {
  petSitterProfile: {
    backgroundColor: '#f8f8f8',
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
  acceptButton: {
    padding: '8px 16px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'green',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default function PendingAppointmentCard({ appointment, updatePendingAppointments, user }) {

  function totalPriceCalculator(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceMs = end - start;
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const totalPrice = days * appointment.petsitter.day_rate;
    return totalPrice;
  }

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

  const isPetsitter = user.id === appointment.petsitter.user_id;

  return (
    <div style={styles.petSitterProfile}>
      <div style={styles.imageWrapper}>
        <img
          height="150"
          width="150"
          src={isPetsitter ? appointment.client.pet_photo : appointment.petsitter.photo}
          style={styles.image}
          alt={isPetsitter ? "Client's Pet" : "Petsitter"}
        />
      </div>
      <h2 style={styles.heading}>
        {isPetsitter ? "Pending Request:" : "Pending Pet Sit Request:"}
      </h2>
      <p style={styles.subheading}>
        {isPetsitter ? "Client Name:" : "Pet Sitter Requested:"} {isPetsitter ? appointment.client.full_name : appointment.petsitter.full_name}
      </p>
      <p style={styles.subheading}>
        Total Price: ${totalPriceCalculator(appointment.start_date, appointment.end_date)}
      </p>
      <p style={styles.subheading}>
        Start Date: {appointment.start_date}
      </p>
      <p style={styles.subheading}>
        End Date: {appointment.end_date}
      </p>
      <p style={styles.subheading}>
        Appointment Information: {appointment.appointment_information}
      </p>
      {isPetsitter ? (
        <div>
          <button onClick={handleAccept} style={{ ...styles.acceptButton, marginLeft: 0 }}>
            Accept Pet Sit
          </button>
          <button onClick={handleDecline} style={styles.cancelButton}>
            Decline Pet Sit
          </button>
        </div>
      ) : (
        <button onClick={handleCancel} style={styles.cancelButton}>
          Cancel Pet Sit Request
        </button>
      )}
    </div>
  );
}
