import React from "react";
import { useState } from "react";

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

export default function UpdateClient({ updateClient, client, changeFormView }) {

    console.log(client)

    const [pet_information, setPetInformation] = useState(client.pet_information)
    const [photo, setPetPhoto] = useState(client.photo)
    const [full_name, setFullName] = useState(client.full_name)
    const [ideal_petsitter, setIdealPetSitter] = useState(client.ideal_petsitter)

    function patchProfile(e) {
        e.preventDefault()
        fetch(`/clients/${client.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pet_information,
                photo,
                full_name,
                ideal_petsitter
            })
        })
            .then((resp) => resp.json())
            .then((newClient) => {
                changeFormView()
                updateClient(newClient)
                setFullName(newClient.full_name)
                setIdealPetSitter(newClient.ideal_petsitter)
                setPetInformation(newClient.pet_information)
                setPetPhoto(newClient.photo)
            })
    }

    return (
        <div style={formStyles.formContainer}>
            <form className="styled-form" onSubmit={patchProfile}>
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
                <button style={formStyles.button} type="submit">Update Account</button>
            </form>
        </div>
    )
}