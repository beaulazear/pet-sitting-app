import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

const styles = {
    petSitterProfile: {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '340px',
        margin: '0 auto',
        textAlign: 'left'
    },
    imageWrapper: {
        width: '150px',
        height: '150px',
        margin: '0 auto 20px',
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
        fontSize: '24px',
        margin: '0',
        color: '#333'
    },
    info: {
        fontSize: '16px',
        color: '#666',
        margin: '10px 0'
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
        marginBottom: '5px'
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
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
    },
};

export default function PetSitterProfile() {

    const { user, setUser } = useContext(UserContext)
    let petSitter = user.petsitter

    const [updateButton, setUpdateButton] = useState(false)
    const [petSitterAvailable, setPetSitterAvailable] = useState(petSitter.currently_available)
    const [updateButtonText, setUpdateButtonText] = useState("Update Account")

    // state for form
    const [bio, setBio] = useState(petSitter.bio)
    const [city, setCity] = useState(petSitter.city)
    const [photo, setPhoto] = useState(petSitter.photo)
    const [day_rate, setDayRate] = useState(petSitter.day_rate)
    const [full_name, setFullName] = useState(petSitter.full_name)
    const [my_ideal_pet_sit, setMyIdealPetSit] = useState(petSitter.my_ideal_pet_sit)
    const [errors, setErrors] = useState([])

    function changeFormView() {
        setUpdateButton(!updateButton)

        if (updateButtonText === "Update Account") {
            setUpdateButtonText("Close Update Form")
        } else {
            setUpdateButtonText("Update Account")
        }
    }

    function handleUpdateAvailability() {
        let newAvailability = !petSitterAvailable
        fetch(`/petsitters/${petSitter.id}/availability`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currently_available: newAvailability
            })
        })
            .then((resp) => resp.json())
            .then((newPetSitter) => {
                setPetSitterAvailable(newAvailability)
                const newUser = user
                user.petsitter = newPetSitter
                setUser(newUser)
            })
    }

    function patchProfile(e) {
        e.preventDefault()
        fetch(`/petsitters/${petSitter.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bio,
                city,
                photo,
                day_rate,
                full_name,
                my_ideal_pet_sit
            })
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((newSitter) => {
                        const newUser = user
                        user.petsitter = newSitter
                        setUser(newUser)
                        changeFormView()
                    });
                } else {
                    response.json().then((errorData) => setErrors(errorData.errors))
                }
            })
    }

    return (
        <div id="petSitterProfile" style={styles.petSitterProfile}>
            <div style={styles.imageWrapper}>
                <img src={petSitter.photo} alt="the petsitter" style={styles.image} />
            </div>
            <h2 style={styles.heading}>Your pet sitting account:</h2>
            <p style={styles.info}><b>Name:</b> Hi, I am {petSitter.full_name}</p>
            <p style={styles.info}><b>City:</b> I am located in {petSitter.city}.</p>
            <p style={styles.info}><b>Day Rate:</b> ${petSitter.day_rate} a day.</p>
            <p style={styles.info}><b>Bio:</b> {petSitter.bio}</p>
            <p style={styles.info}><b>My Ideal Pet Sit:</b> {petSitter.my_ideal_pet_sit}</p>
            <p style={styles.info}><b>Account Status:</b> {petSitter.currently_available? "Active" : "Not Active"}</p>
            <button className="acceptButton" onClick={() => changeFormView()}>{updateButtonText}</button>
            {updateButton === true && (
                <div style={formStyles.formContainer}>
                    <form className="styled-form" onSubmit={patchProfile}>
                        <h2>Update Pet Sitter account</h2>
                        <div style={formStyles.formGroup}>
                            <label htmlFor="name" style={formStyles.label}>Your Full Name:</label>
                            <input type="text" id="bio" value={full_name} onChange={(e) => setFullName(e.target.value)} style={formStyles.input} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label htmlFor="name" style={formStyles.label}>Bio:</label>
                            <textarea type="text" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} style={formStyles.input} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label htmlFor="name" style={formStyles.label}>My Ideal Pet Sit:</label>
                            <textarea type="text" id="bio" value={my_ideal_pet_sit} onChange={(e) => setMyIdealPetSit(e.target.value)} style={formStyles.input} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label htmlFor="city" style={formStyles.label}>City:</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} style={formStyles.input} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label htmlFor="photo" style={formStyles.label}>Photo Url:</label>
                            <input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} style={formStyles.input} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label htmlFor="dayRate" style={formStyles.label}>Day Rate:</label>
                            <input type="text" id="dayRate" value={day_rate} onChange={(e) => setDayRate(e.target.value)} style={formStyles.input} />
                        </div>
                        <button className="acceptButton" type="submit">Update Account</button>
                    </form>
                    {errors.length > 0 && (
                        <ul style={formStyles.errorList}>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {petSitterAvailable === true && (
                <div>
                    <button className="declineButton" onClick={handleUpdateAvailability}>Temporarily Deactivate Profile</button>
                </div>
            )}
            {petSitterAvailable === false && (
                <div>
                    <button className="acceptButton" onClick={handleUpdateAvailability}>Activate Profile</button>
                </div>
            )}
        </div>
    );
}