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
        },
        image: {
            display: 'block',
            margin: '0 auto',
            borderRadius: '8px',
        },
    };

    return (
        <div id="petSitterProfile" style={styles.clientProfile}>
            <img style={styles.image} src={client.pet_photo} height="400" width="300"></img>
            <h2>Your client account:</h2>
            <p><b>My Name:</b> {client.full_name}, NYC</p>
            <p><b>About my pet:</b> {client.pet_information}</p>
            <p><b>Ideal petsitter:</b> {client.ideal_petsitter}</p>
        </div>
    )
}