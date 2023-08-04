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

export default function UpdatePetSitter({ updatePetSitter, petSitter, changeFormView }) {

    const [bio, setBio] = useState(petSitter.bio)
    const [city, setCity] = useState(petSitter.city)
    const [photo, setPhoto] = useState(petSitter.photo)
    const [day_rate, setDayRate] = useState(petSitter.day_rate)
    const [full_name, setFullName] = useState(petSitter.full_name)
    const [my_ideal_pet_sit, setMyIdealPetSit] = useState(petSitter.my_ideal_pet_sit)
    // const [errors, setErrors] = useState([])

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
            .then((resp) => resp.json())
            .then((newSitter) => {
                changeFormView()
                updatePetSitter(newSitter)
            })
    }

    return (
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
                <button type="submit">Update Account</button>
            </form>
            {/* {errors.length > 0 && (
                <ul style={formStyles.errorList}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )} */}
        </div>
    )
}