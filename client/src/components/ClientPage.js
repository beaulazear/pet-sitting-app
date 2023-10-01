import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import ClientProfile from "./ClientProfile";
import ClientPendingAppointments from "./ClientPendingAppointments";

const formStyles = {
    formContainer: {
        marginTop: '20px',
        backgroundColor: '#f8f8f8',
        padding: '20px',
        marginRight: "50px",
        marginLeft: "50px",
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
        width: '96%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
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
        );
    }
}