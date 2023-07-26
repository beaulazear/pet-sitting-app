import React, { useState, useEffect } from "react";
import ClientProfile from "./ClientProfile";
import PendingPetSits from "./PendingPetSits";

export default function ClientPage({ user, updateUser }) {

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
                pet_photo,
                ideal_petsitter,
                user_id: user.id,
                currently_available: true
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((client) => {
                    setClient(client)
                    updateUser(client)
                });
            }
        })
    }

    if (client) {
        return (
            <div>
                <ClientProfile client={client} />
                <PendingPetSits user={user} petSitterOrClient={client} />
            </div>
        )
    } else {
        return (
            <div className="form-container">
                <form className="styled-form" onSubmit={handleClientOptIn}>
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