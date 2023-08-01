import React from "react";

const styles = {
    clientProfile: {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        margin: '10px auto',
        textAlign: 'center'
    },
    imageWrapper: {
        width: '100px',
        height: '100px',
        margin: '0 auto 10px',
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
        fontSize: '20px',
        margin: '0',
        color: '#333'
    },
    info: {
        fontSize: '14px',
        color: '#666',
        margin: '5px 0'
    }
};

export default function ConversationClientCard({ conversation, removeConversation, client, scrollToBottom }) {

    function handleConvoDelete() {
        if (window.confirm("Are you sure? Messages from this conversation will not be able to be viewed by either user.") === true) {
            fetch(`/conversations/${conversation.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => resp.json())
                .then((data) => removeConversation(data))
        }
    }

    return (
        <div id="clientProfile" style={styles.clientProfile}>
            <div style={styles.imageWrapper}>
                <img src={client.photo} alt="the client" style={styles.image} />
            </div>
            <h3 style={styles.heading}>{client.full_name}</h3>
            <p style={styles.info}><b>About my pet:</b> {client.pet_information}</p>
            <p style={styles.info}><b>Ideal petsitter:</b> {client.ideal_petsitter}</p>
            <button className="acceptButton" onClick={scrollToBottom}>Go to end of chat.</button>
            <br></br><br></br>
            <button className="declineButton" onClick={handleConvoDelete}>Delete conversation.</button>
        </div>
    );
}
