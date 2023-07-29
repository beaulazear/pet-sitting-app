import React from "react";
import '../App.css';

const styles = {
    petSitterCard: {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px', // Reduced the width to make it smaller
        margin: '10px auto',
        textAlign: 'center',
    },
    imageWrapper: {
        width: '100px', // Reduced the size of the imageWrapper
        height: '100px', // Reduced the size of the imageWrapper
        margin: '0 auto 10px', // Reduced the margin
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
        fontSize: '20px', // Reduced the font size for a smaller heading
        margin: '0',
        color: '#333',
    },
    subheading: {
        fontSize: '16px', // Reduced the font size for subheadings
        margin: '5px 0', // Reduced the margin for subheadings
        color: '#666',
    },
    info: {
        fontSize: '14px', // Reduced the font size for info text
        color: '#666',
        margin: '5px 0', // Reduced the margin for info text
    },
    button: {
        fontSize: '14px',
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default function ConversationPetSitterCard({ petSitter, scrollToBottom, user }) {

    return (
        <div className="petSitterCardDiv" style={styles.petSitterCard}>
            <div style={styles.imageWrapper}>
                <img
                    src={petSitter.photo}
                    alt="the petsitter"
                    style={styles.image}
                />
            </div>
            <h3 style={styles.heading}>{petSitter.full_name}</h3>
            <h4 style={styles.subheading}>About me:</h4>
            <p style={styles.info}>I am based in {petSitter.city}, NYC</p>
            <p style={styles.info}>{petSitter.bio}</p>
            <h4 style={styles.subheading}>My ideal pet sit:</h4>
            <p style={styles.info}>{petSitter.my_ideal_pet_sit}</p>
            <h4 style={styles.subheading}>What do I charge?</h4>
            <p style={styles.info}>My rate is currently ${petSitter.day_rate}</p>
        </div>
    );
}
