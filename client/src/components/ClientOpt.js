import React, { useState, useEffect } from "react";

export default function ClientOpt({ user }) {

    const [pet_information, setPetInformation] = useState("")
    const [pet_photo, setPetPhoto] = useState("")
    const [full_name, setFullName] = useState("")
    const [ideal_petsitter, setIdealPetSitter] = useState("")
    const [client, setClient] = useState(null)

    useEffect(() => {
        fetch("/client").then((response) => {
            if (response.ok) {
                response.json().then((client) => setClient(client));
            }
        });
    }, []);

    // ending here for now, change this submit request to create new client instance and reflect as such on the front end!

    function handlePetSitterOptIn(e) {
        e.preventDefault();
        fetch(`/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pet_information,
                full_name,
                pet_photo,
                ideal_petsitter,
                user_id: user.id,
                currently_available: true
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((client) => setClient(client));
            }
        })
    }

    const styles = {
        clientProfile: {
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

    if (client) {
        return (
            <div id="petSitterProfile" style={styles.clientProfile}>
                <img style={styles.image} src={client.pet_photo} height="400" width="300"></img>
                <h2>Your client account:</h2>
                <p><b>My Name:</b> {client.full_name}, NYC</p>
                <p><b>About my pet:</b> {client.pet_information}</p>
                <p><b>Ideal petsitter:</b> {client.ideal_petsitter}</p>
            </div>
        )
    } else {
        return (
            <div className="form-container">
                <form className="styled-form" onSubmit={handlePetSitterOptIn}>
                    <h2>Become a Client Form</h2>
                    <div className='form-group'>
                        <label htmlFor="full_name">Full Name:</label>
                        <input
                            type="text"
                            id="photo"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="pet_information">Pet Information:</label>
                        <textarea
                            type="text"
                            id="pet_information"
                            value={pet_information}
                            onChange={(e) => setPetInformation(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="ideal_petsitter">Your Ideal Pet-Sitter:</label>
                        <textarea
                            type="text"
                            id="ideal_petsitter"
                            value={ideal_petsitter}
                            onChange={(e) => setIdealPetSitter(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="pet_photo">Pet Photo Url:</label>
                        <input
                            type="text"
                            id="pet_photo"
                            value={pet_photo}
                            onChange={(e) => setPetPhoto(e.target.value)}
                        />
                    </div>
                    <button type="submit">Create client account</button>
                </form>
            </div>
        )
    }
}