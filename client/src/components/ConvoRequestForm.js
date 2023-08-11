import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const formStyles = {
    formContainer: {
        marginTop: '20px',
        backgroundColor: '#f8f8f8',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        fontSize: '16px',
        color: '#333',
        marginBottom: '5px'
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    select: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff'
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
        cursor: 'pointer'
    },
    errorList: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'left',
        paddingLeft: '20px'
    }
};

export default function ConvoRequestForm({ user, petSitter }) {

    const [convoTitle, setConvoTitle] = useState("")
    const navigate = useNavigate()

    function startConversation(e) {
        e.preventDefault()

        if (user.client !== null) {
            fetch("/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: user.client.id,
                    petsitter_id: petSitter.id,
                    conversation_title: convoTitle
                }),
            })
                .then((resp) => resp.json())
                .then((convo) => {

                    let newMessageBodyOne = `Automated message: ${user.username} just started a conversation.`

                    fetch("/messages", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user_id: user.id,
                            conversation_id: convo.id,
                            body: newMessageBodyOne
                        })
                    })
                        .then((resp) => resp.json())
                        .then(() => {

                            let newMessageBodyTwo = `Automated message: ${user.username} just added petsitter ${petSitter.full_name} to a conversation.`

                            fetch("/messages", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    user_id: petSitter.user_id,
                                    conversation_id: convo.id,
                                    body: newMessageBodyTwo
                                })
                            })
                                .then((resp) => resp.json())
                                .then(() => navigate('/conversations')
                                )
                        })
                })
        }
    }


    return (
        <div style={formStyles.formContainer}>
            <h2>Start a conversation:</h2>
            <form className="custom-form" onSubmit={startConversation}>
                <div style={formStyles.formGroup}>
                    <label htmlFor="housesit" style={formStyles.label}>
                        Conversation Title:
                    </label>
                    <input onChange={(e) => setConvoTitle(e.target.value)} className="conversationTitle" style={formStyles.input} placeholder="example: June pet-sit" />
                </div>
                <button style={formStyles.button}>Start a conversation</button>
            </form>
            {/* {errors.length > 0 && (
                    <ul style={formStyles.errorList}>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )} */}
        </div>
    );
}