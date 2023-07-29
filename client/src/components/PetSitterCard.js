import React, { useState } from "react";
import '../App.css';
import PetSitRequestForm from "./PetSitRequestForm";

export default function PetSitterCard({ petSitter, user }) {

  const [displayForm, setDisplayForm] = useState(false)
  const [buttonText, setButtonText] = useState("Book appointment with this petsitter")

  function updateDisplayForm() {
    if (displayForm === false) {
      setDisplayForm(true)
      setButtonText("Close request form")
    } else {
      setDisplayForm(false)
      setButtonText("Book appointment with this petsitter")
    }
  }

  const styles = {
    petSitterCard: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '10px auto',
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
    info: {
      fontSize: '16px',
      color: '#666',
      margin: '10px 0',
    },
  };

  return (
    <div className="petSitterCardDiv" style={styles.petSitterCard}>
      <div style={styles.imageWrapper}>
        <img
          src={petSitter.photo}
          alt="the petsitter"
          style={styles.image}
        />
      </div>
      <h3 style={styles.heading}>Hi, I am {petSitter.full_name}!</h3>
      <h4 style={styles.subheading}>About me:</h4>
      <p style={styles.info}>I am based in {petSitter.city}, NYC</p>
      <p style={styles.info}>{petSitter.bio}</p>
      <h4 style={styles.subheading}>My ideal pet sit:</h4>
      <p style={styles.info}>{petSitter.my_ideal_pet_sit}</p>
      <h4 style={styles.subheading}>What do I charge?</h4>
      <p style={styles.info}>My rate is currently ${petSitter.day_rate}</p>
      <button onClick={updateDisplayForm} value={buttonText}>{buttonText}</button>
      {displayForm === true &&
        <PetSitRequestForm user={user} petSitter={petSitter} />
      }
    </div>
  );

}