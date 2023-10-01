import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../context/user";

// why isnt useRef working here? I want the screen to follow the update form..

const styles = {
    clientProfile: {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '340px',
        margin: '0 auto',
        textAlign: 'left',
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

export default function ClientProfile() {

    const { user, setUser } = useContext(UserContext)
    const client = user.client

    const [updateButton, setUpdateButton] = useState(false)
    const [updateButtonText, setUpdateButtonText] = useState("Update Account")

    const [pet_information, setPetInformation] = useState(client.pet_information)
    const [photo, setPetPhoto] = useState(client.photo)
    const [full_name, setFullName] = useState(client.full_name)
    const [ideal_petsitter, setIdealPetSitter] = useState(client.ideal_petsitter)
    const [errors, setErrors] = useState([])

    function changeFormView() {
        setUpdateButton(!updateButton)
        if (updateButtonText === "Update Account") {
            setUpdateButtonText("Close Update Form")
            scrollToBottom()
        } else {
            setUpdateButtonText("Update Account")
        }
    }

    const bottomElement = useRef(null);

    function scrollToBottom() {
        bottomElement?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    function patchProfile(e) {
        e.preventDefault()
        fetch(`/clients/${user.client.id}`, {
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
            .then((response) => {
                if (response.ok) {
                    response.json().then((newClient) => {
                        const newUser = user
                        user.client = newClient
                        setUser(newUser)
                        changeFormView()
                        setFullName(newClient.full_name)
                        setIdealPetSitter(newClient.ideal_petsitter)
                        setPetInformation(newClient.pet_information)
                        setPetPhoto(newClient.photo)

                    });
                } else {
                    response.json().then((errorData) => setErrors(errorData.errors))
                }
            })
    }

    return (
        <div id="clientProfile" style={styles.clientProfile}>
            <div style={styles.imageWrapper}>
                <img src={client.photo} alt="the client" style={styles.image} />
            </div>
            <h2 style={styles.heading}>Your client account:</h2>
            <p style={styles.info}><b>My Name:</b> {client.full_name}, NYC</p>
            <p style={styles.info}><b>About my pet:</b> {client.pet_information}</p>
            <p style={styles.info}><b>Ideal petsitter:</b> {client.ideal_petsitter}</p>
            <button className="acceptButton" onClick={() => changeFormView()}>{updateButtonText}</button>
            {updateButton === true && (
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
                        <button type="submit">Update Account</button>
                    </form>
                    {errors.length > 0 && (
                        <ul style={formStyles.errorList}>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                                ))}
                        </ul>
                    )}
                    <div ref={bottomElement}></div>
                </div >
            )}
        </div>
    );

}