import React, { useState, useEffect } from "react";
import PetSitterProfile from "./PetSitterProfile";
import PendingPetSits from "./PendingPetSits";

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
};

export default function PetSitterPage({ user, updateUser }) {

    const [bio, setBio] = useState("")
    const [city, setCity] = useState("")
    const [photo, setPhoto] = useState("")
    const [day_rate, setDayRate] = useState("")
    const [full_name, setFullName] = useState("")
    const [my_ideal_pet_sit, setMyIdealPetSit] = useState("")
    const [petSitter, setPetSitter] = useState(null)

    useEffect(() => {
        fetch("/petsitter").then((response) => {
            if (response.ok) {
                response.json().then((petSitter) => setPetSitter(petSitter));
            }
        });
    }, []);

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
                response.json().then((petSitter) => {
                    setPetSitter(petSitter)
                    updateUser(petSitter)
                });
            }
        })
    }

    if (petSitter) {
        return (
            <div>
                <PetSitterProfile petSitter={petSitter} />
                <PendingPetSits petSitter={petSitter} user={user} />
                {/* <AcceptedAppointments petSitter={petSitter} user={user} /> */}
            </div>

        )
    } else {
        return (
            <div style={formStyles.formContainer}>
                <form className="styled-form" onSubmit={handlePetSitterOptIn}>
                    <h2>Pet Sitter Form</h2>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="name" style={formStyles.label}>Your Full Name:</label>
                        <input
                            type="text"
                            id="bio"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="name" style={formStyles.label}>Bio:</label>
                        <textarea
                            type="text"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="name" style={formStyles.label}>My Ideal Pet Sit:</label>
                        <textarea
                            type="text"
                            id="bio"
                            value={my_ideal_pet_sit}
                            onChange={(e) => setMyIdealPetSit(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="city" style={formStyles.label}>City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="photo" style={formStyles.label}>Photo Url:</label>
                        <input
                            type="text"
                            id="photo"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="dayRate" style={formStyles.label}>Day Rate:</label>
                        <input
                            type="text"
                            id="dayRate"
                            value={day_rate}
                            onChange={(e) => setDayRate(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>
                    <button type="submit" style={formStyles.button}>Become a pet sitter!</button>
                </form>
            </div>
        );
    }
}