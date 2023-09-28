import React, { useContext } from "react";
import UpdatePetSitRequest from "./UpdatePetSitRequest";
import { UserContext } from "../context/user";

const styles = {
  petSitterProfile: {
    backgroundColor: '#FFF3D0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center'
  },
  imageWrapper: {
    width: '150px',
    height: '150px',
    margin: '0 auto 20px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  heading: {
    fontSize: '24px',
    margin: '0',
    color: '#333'
  },
  subheading: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#666'
  },
  cancelButton: {
    padding: '8px 16px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'red',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
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
    marginLeft: '10px'
  },
};

export default function PendingAppointmentCard({ deleteAppointmentRequest, appointment, updatePendingAppointments }) {

  const { user } = useContext(UserContext)

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
  }

  function handleDecline() {
    fetch(`/appointments/${appointment.id}/declined`)
      .then((resp) => resp.json())
      .then((apt) => updatePendingAppointments(apt))
  }

  console.log(user, appointment)

  const isPetsitter = user.id === appointment.petsitter_id;

  if (isPetsitter) {
    return (
      <div id="petSitterProfile" style={styles.petSitterProfile}>
        <div style={styles.imageWrapper}>
          <img height="150" width="150" src={appointment.client.photo} style={styles.image} alt="the pet of the appointment" />
        </div>
        <h2>Pending Request:</h2>
        <p><b>Client Name:</b> {appointment.client.full_name}</p>
        <p><b>Total Price:</b> ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
        <p><b>Start Date:</b> {appointment.start_date}</p>
        <p><b>End Date:</b> {appointment.end_date}</p>
        {appointment.boarding === true &&
          <p><b>Open to boarding at petsitters place</b></p>
        }
        {appointment.in_house === true &&
          <p><b>Open to house-sitting at clients place</b></p>
        }
        <p><b>Appointment Information:</b> {appointment.appointment_information}</p>
        <button onClick={handleAccept} className="acceptButton" value="Accepted">Accept Pet Sit</button>
        <button onClick={handleDecline} className="declineButton" value="Declined">Decline Pet Sit</button>
      </div>
    );
  } else {
    return (
      <div id="petSitterProfile" style={styles.petSitterProfile}>
        <div style={styles.imageWrapper}>
          <img height="150" width="150" src={appointment.petsitter.photo} style={styles.image} alt="the petsitter" />
        </div>
        <h2>Pending Pet Sit Request:</h2>
        <p><b>Pet Sitter Requested:</b> {appointment.petsitter.full_name}</p>
        <p><b>Total Price:</b> ${totalPriceCalculator(appointment.start_date, appointment.end_date)}</p>
        <p><b>Start Date:</b> {appointment.start_date}</p>
        <p><b>End Date:</b> {appointment.end_date}</p>
        <p><b>Appointment Information:</b> {appointment.appointment_information}</p>
        <UpdatePetSitRequest deleteAppointmentRequest={deleteAppointmentRequest} appointment={appointment} updatePendingAppointments={updatePendingAppointments} />
      </div>
    );
  }
}
