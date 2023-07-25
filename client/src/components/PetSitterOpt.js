import React, { useState, useEffect } from "react";
import PetSitterProfile from "./PetSitterProfile";
import PendingPetSits from "./PendingPetSits";

export default function PetSitterOpt({ user }) {

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
                response.json().then((petSitter) => setPetSitter(petSitter));
            }
        })
    }

    if (petSitter) {
        return (
            <div>
                <PetSitterProfile petSitter={petSitter} user={user} />
                <PendingPetSits petSitter={petSitter} user={user} />
            </div>

        )
    } else {
        return (
            <div className="form-container">
                <h2>Welcome, {user.username}!</h2>
                <form className="styled-form" onSubmit={handlePetSitterOptIn}>
                    <h2>Pet Sitter Form</h2>
                    <div className='form-group'>
                        <label htmlFor="name">Your Full Name:</label>
                        <input
                            type="text"
                            id="bio"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Bio:</label>
                        <textarea
                            type="text"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">My Ideal Pet Sit:</label>
                        <textarea
                            type="text"
                            id="bio"
                            value={my_ideal_pet_sit}
                            onChange={(e) => setMyIdealPetSit(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="photo">Photo Url:</label>
                        <input
                            type="text"
                            id="photo"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="dayRate">Day Rate:</label>
                        <input
                            type="text"
                            id="dayRate"
                            value={day_rate}
                            onChange={(e) => setDayRate(e.target.value)}
                        />
                    </div>
                    <button type="submit">Become a pet sitter!</button>
                </form>
            </div>
        )
    }
}