import React, { useState, useEffect } from "react";

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

    const styles = {
        petSitterProfile: {
          backgroundColor: '#f8f8f8',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          margin: '0 auto',
        },
        image: {
          display: 'block',
          margin: '0 auto',
          borderRadius: '8px',
        },
      };

    if (petSitter) {
        return (
            <div id="petSitterProfile" style={styles.petSitterProfile}>
                <img src={petSitter.photo} height="400" width="300" style={styles.image}></img>
                <h2>Your pet sitting account:</h2>
                <p><b>City:</b> {petSitter.city}, NYC</p>
                <p><b>Day Rate:</b> ${petSitter.day_rate}</p>
                <p><b>Bio:</b> {petSitter.bio}</p>
                <p><b>My Ideal Pet Sit:</b> {petSitter.my_ideal_pet_sit}</p>
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