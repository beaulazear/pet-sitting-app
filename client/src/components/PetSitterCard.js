import React from "react";
import '../App.css';
import PetSitRequestForm from "./PetSitRequestForm";

export default function PetSitterCard({ petSitter, user }) {

    const styles = {
        petSitterCard: {
          backgroundColor: '#f8f8f8',
          padding: '20px', /* Adding padding around the whole div */
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

    return (
        <div className="petSitterCardDiv" style={styles.petSitterCard}>
            <img src={petSitter.photo} alt="the petsitter" height={400} width={300} style={styles.image}></img>
            <h3>Hi, I am {petSitter.full_name}!</h3>
            <h4>About me:</h4>
            <p>I am based in {petSitter.city}, NYC</p>
            <p>{petSitter.bio}</p>
            <h4>My ideal pet sit:</h4>
            <p>{petSitter.my_ideal_pet_sit}</p>
            <h4>What do I charge?</h4>
            <p>My rate is currently ${petSitter.day_rate}</p>
            <PetSitRequestForm user={user} petSitter={petSitter}/>
        </div>
    )
}