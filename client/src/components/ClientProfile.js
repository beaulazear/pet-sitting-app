import React from "react";

export default function ClientProfile({ client }) {

    const styles = {
        clientProfile: {
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

    return (
        <div id="clientProfile" style={styles.clientProfile}>
            <div style={styles.imageWrapper}>
                <img
                    src={client.pet_photo}
                    alt="the client"
                    style={styles.image}
                />
            </div>
            <h2 style={styles.heading}>Your client account:</h2>
            <p style={styles.info}><b>My Name:</b> {client.full_name}, NYC</p>
            <p style={styles.info}><b>About my pet:</b> {client.pet_information}</p>
            <p style={styles.info}><b>Ideal petsitter:</b> {client.ideal_petsitter}</p>
        </div>
    );

}