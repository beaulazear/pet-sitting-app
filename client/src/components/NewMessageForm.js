import React, { useState } from "react";

const formStyles = {
    formContainer: {
        marginTop: '20px',
        backgroundColor: '#f8f8f8',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        fontSize: '16px',
        color: '#333',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    select: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
    errorList: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'left',
        paddingLeft: '20px',
    },
};

export default function NewMessageForm({ updateMessages, user, currentConvoId, updateConvoButton, scrollToBottom }) {

    const [messageInformation, setMessageInformation] = useState("")

    scrollToBottom()
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                conversation_id: currentConvoId,
                body: messageInformation
            })
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMessageInformation("")
            updateMessages(data)
            scrollToBottom()
        })
    }

    return (
        <div style={formStyles.formContainer}>
            <h2>New message:</h2>
            <form className="custom-form" onSubmit={handleSubmit}>
                <div style={formStyles.formGroup}>
                    <label htmlFor="appointment_information" style={formStyles.label}>
                        Message Content:
                    </label>
                    <textarea
                        type="text"
                        className="custom-input"
                        value={messageInformation}
                        onChange={(e) => setMessageInformation(e.target.value)}
                        style={formStyles.input}
                    />
                </div>
                <button style={formStyles.button}>Send Message</button>
                <button style={formStyles.button} onClick={updateConvoButton}>Exit Conversation.</button>
            </form>
        </div>
    );
}