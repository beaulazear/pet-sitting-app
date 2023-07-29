import React from "react";

const styles = {
    petSitterProfile: {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        border: '1px solid #ddd',
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
    info: {
        fontSize: '16px',
        color: '#666',
        margin: '10px 0',
    },
};

export default function PetSitterProfile({ petSitter }) {

    return (
        <div id="petSitterProfile" style={styles.petSitterProfile}>
            <div style={styles.imageWrapper}>
                <img
                    src={petSitter.photo}
                    alt="the petsitter"
                    style={styles.image}
                />
            </div>
            <h2 style={styles.heading}>Your pet sitting account:</h2>
            <p style={styles.info}><b>Name:</b> Hi, I am {petSitter.full_name}!</p>
            <p style={styles.info}><b>City:</b> I am located in {petSitter.city}, NYC</p>
            <p style={styles.info}><b>Day Rate:</b> ${petSitter.day_rate} a day.</p>
            <p style={styles.info}><b>Bio:</b> {petSitter.bio}</p>
            <p style={styles.info}><b>My Ideal Pet Sit:</b> {petSitter.my_ideal_pet_sit}</p>
        </div>
    );
}