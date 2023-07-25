import React, { useEffect, useState } from "react";
import PetSitterCard from "./PetSitterCard";

export default function PetSittersPage({ handleLogout, user }) {

    const [petSitters, setPetSitters] = useState(null)

    useEffect(() => {
        fetch("/petsitters")
            .then((response) => response.json())
            .then((petSitters) => setPetSitters(petSitters))
    }, [])

    if (petSitters) {
        return (
            <div id="petSittersPageDiv">
                {petSitters.map((petSitter) => (
                    <PetSitterCard user={user} key={petSitter.id} petSitter={petSitter} />
                ))}
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    } else {
        return <h1>... No pet sitters loaded yet ...</h1>
    }
}