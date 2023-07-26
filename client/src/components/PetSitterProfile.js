import React from "react";

export default function PetSitterProfile({ petSitter }) {

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

    return (
        <div id="petSitterProfile" style={styles.petSitterProfile}>
            <img src={petSitter.photo} height="400" width="300" style={styles.image}></img>
            <h2>Your pet sitting account:</h2>
            <p><b>Name:</b> Hi, I am {petSitter.full_name}!</p>
            <p><b>City:</b> I am located in {petSitter.city}, NYC</p>
            <p><b>Day Rate:</b> ${petSitter.day_rate} a day.</p>
            <p><b>Bio:</b> {petSitter.bio}</p>
            <p><b>My Ideal Pet Sit:</b> {petSitter.my_ideal_pet_sit}</p>
        </div>
    )
}