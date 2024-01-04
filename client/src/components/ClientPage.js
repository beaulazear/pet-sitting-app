import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import ClientProfile from "./ClientProfile";
import ClientPendingAppointments from "./ClientPendingAppointments";

const commonWidth = '550px';

const formStyles = {
    formContainer: {
        margin: '20px auto',
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: commonWidth,
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '18px',
        color: '#333',
        marginBottom: '8px',
    },
    input: {
        padding: '12px',
        width: 'calc(100% - 24px)', // Adjusted width considering padding
        fontSize: '16px',
        borderRadius: '6px',
        border: '2px solid #ddd',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
    },
};

const welcomeMessageStyles = {
    padding: '30px',
    fontFamily: 'Helvetica, sans-serif',
    maxWidth: commonWidth,
    margin: '20px auto', // Adjusted margin here
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
};

const headingStyles = {
    fontSize: '32px',
    marginBottom: '20px',
    color: 'black',
};

const paragraphStyles = {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '16px',
};

export default function ClientPage() {

    const { user, setUser } = useContext(UserContext)

    const [pet_information, setPetInformation] = useState("")
    const [photo, setPetPhoto] = useState("")
    const [full_name, setFullName] = useState("")
    const [ideal_petsitter, setIdealPetSitter] = useState("")
    const [client, setClient] = useState(user.client)

    function handleClientOptIn(e) {
        e.preventDefault();
        fetch(`/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pet_information,
                full_name,
                photo,
                ideal_petsitter,
                user_id: user.id,
                currently_available: true
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((client) => {
                    const newUser = user
                    user.client = client
                    setUser(newUser)
                    setClient(client)
                });
            }
        })
    }

    if (client) {
        return (
            <div>
                <ClientProfile />
                <ClientPendingAppointments />
            </div>
        )
    } else {
        return (
            <>
                <div style={welcomeMessageStyles}>
                    <h2 style={headingStyles}>Sign up as a client below!</h2>
                    <p style={paragraphStyles}>You are currenly not signed up as a client. Use the form to sign up and contact petsitters for pet sits!</p>
                </div>
                <div style={formStyles.formContainer}>
                    <form className="styled-form" onSubmit={handleClientOptIn}>
                        <h2>Client Form</h2>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="full_name">
                                Full Name:
                            </label>
                            <input style={formStyles.input} type="text" id="photo" value={full_name} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="pet_information">
                                Pet Information:
                            </label>
                            <textarea style={formStyles.input} type="text" id="pet_information" value={pet_information} onChange={(e) => setPetInformation(e.target.value)} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="ideal_petsitter">
                                Your Ideal Pet-Sitter:
                            </label>
                            <textarea style={formStyles.input} type="text" id="ideal_petsitter" value={ideal_petsitter} onChange={(e) => setIdealPetSitter(e.target.value)} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="photo">
                                Pet Photo Url:
                            </label>
                            <input style={formStyles.input} type="text" id="photo" value={photo} onChange={(e) => setPetPhoto(e.target.value)} />
                        </div>
                        <button style={formStyles.button} type="submit">
                            Create client account
                        </button>
                    </form>
                </div>
            </>
        );
    }
}