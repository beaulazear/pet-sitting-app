import React from "react";

export default function ConversationClientCard({ client, scrollToBottom }) {

    const styles = {
        clientProfile: {
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
            fontSize: '20px', // Reduced the font size for the heading
            margin: '0',
            color: '#333',
        },
        info: {
            fontSize: '14px', // Reduced the font size for info text
            color: '#666',
            margin: '5px 0', // Reduced the margin for info text
        },
    };

    return (
        <div id="clientProfile" style={styles.clientProfile}>
            <div style={styles.imageWrapper}>
                <img
                    src={client.photo}
                    alt="the client"
                    style={styles.image}
                />
            </div>
            <h3 style={styles.heading}>{client.full_name}</h3>
            <p style={styles.info}><b>About my pet:</b> {client.pet_information}</p>
            <p style={styles.info}><b>Ideal petsitter:</b> {client.ideal_petsitter}</p>
            <button onClick={scrollToBottom}>Go to end of chat.</button>
        </div>
    );
}
