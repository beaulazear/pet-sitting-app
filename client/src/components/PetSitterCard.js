import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../context/user";
import '../App.css';
import PetSitRequestForm from "./PetSitRequestForm";

const styles = {
  petSitterCard: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '10px auto',
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
  info: {
    fontSize: '16px',
    color: '#666',
    margin: '10px 0'
  },
};

export default function PetSitterCard({ newRequestFromClientPage, petSitter }) {

  const { user } = useContext(UserContext)

  const [displayForm, setDisplayForm] = useState(false)
  const [buttonText, setButtonText] = useState("Request Pet Sit")

  const bottomElement = useRef(null);

  function scrollToBottom() {
      bottomElement?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function updateDisplayForm() {
    if (displayForm === false) {
      setDisplayForm(true)
      setButtonText("Close form")
      scrollToBottom()
    } else {
      setDisplayForm(false)
      setButtonText("Request Pet Sit")
    }
  }

  function updateDisplayFormAfterSubmit() {
    setDisplayForm(false)
  }

  return (
    <div className="petSitterCardDiv" style={styles.petSitterCard}>
      <div style={styles.imageWrapper}>
        <img src={petSitter.photo} alt="the petsitter" style={styles.image} />
      </div>
      <h3 style={styles.heading}>{petSitter.full_name}</h3>
      <h4 style={styles.subheading}>Location:</h4>
      <p style={styles.info}>I am based in {petSitter.city}</p>
      <h4 style={styles.subheading}>About me:</h4>
      <p style={styles.info}>{petSitter.bio}</p>
      <h4 style={styles.subheading}>My ideal pet sit:</h4>
      <p style={styles.info}>{petSitter.my_ideal_pet_sit}</p>
      <h4 style={styles.subheading}>What do I charge?</h4>
      <p style={styles.info}>My rate is currently ${petSitter.day_rate}</p>
      {user.client && (
        <div>
          <button onClick={updateDisplayForm} value={buttonText}>{buttonText}</button>
          {displayForm === true &&
            <div>
              <PetSitRequestForm newRequestFromClientPage={newRequestFromClientPage} updateDisplayForm={updateDisplayFormAfterSubmit} petSitter={petSitter} />
            </div>
          }
        </div>
      )}
      <div ref={bottomElement}>
      </div>
    </div>
  );
}