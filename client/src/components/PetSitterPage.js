import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import PetSitterProfile from "./PetSitterProfile";
import PendingAppointments from "./PendingAppointments";

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

export default function PetSitterPage() {

    const { user, setUser } = useContext(UserContext)

    const [petsitter, setPetsitter] = useState(user.petsitter)
    const [bio, setBio] = useState("")
    const [city, setCity] = useState("")
    const [photo, setPhoto] = useState("")
    const [day_rate, setDayRate] = useState("")
    const [full_name, setFullName] = useState("")
    const [my_ideal_pet_sit, setMyIdealPetSit] = useState("")
    const [errors, setErrors] = useState([])

    function updatePetSitter(newPetsitter) {
        const newUser = user
        user.petsitter = newPetsitter
        setUser(newUser)
    }

    function handlePetSitterOptIn(e) {
        e.preventDefault();
        fetch(`/petsitters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio,
                city,
                photo,
                day_rate,
                full_name,
                my_ideal_pet_sit,
                user_id: user.id,
                currently_available: true
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((petsitter) => {
                    const newUser = user
                    newUser.petsitter = petsitter
                    setUser(newUser)
                    setPetsitter(petsitter)
                });
            } else {
                response.json().then((errorData) => {
                    console.log(errorData)
                    setErrors(errorData.errors)
                })
            }
        })
    }

    if (petsitter) {
        return (
            <div>
                <PetSitterProfile updatePetSitter={updatePetSitter} />
                <PendingAppointments />
            </div>

        )
    } else {
        return (
            <>
                <div style={welcomeMessageStyles}>
                    <h2 style={headingStyles}>Sign up as a petsitter below!</h2>
                    <p style={paragraphStyles}>You are currenly not signed up as a pet sitter. Use the form below to sign up and get listed on the petsitters page! Here, clients can find your profile and submit booking requests.</p>
                </div>
                <div style={formStyles.formContainer}>
                    <form className="styled-form" onSubmit={handlePetSitterOptIn}>
                        <h2>Pet Sitter Form</h2>
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
                        <button type="submit" style={formStyles.button}>Become a pet sitter!</button>
                    </form>
                    {errors.length > 0 && (
                        <ul style={formStyles.errorList}>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </>
        );
    }
}