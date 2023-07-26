import React, { useEffect, useState } from "react";
import PetSitterCard from "./PetSitterCard";

export default function PetSittersPage({ handleLogout, user }) {

    const [petSitters, setPetSitters] = useState(null)

    useEffect(() => {
        fetch("/petsitters")
            .then((response) => response.json())
            .then((petSitters) => {
                let newSitters = petSitters.filter((sitter) => sitter.user_id != user.id)
                setPetSitters(newSitters)
            })
    }, [])

    if (petSitters) {
        return (
            <div id="petSittersPageDiv">
                {petSitters.map((petSitter) => (
                    <PetSitterCard user={user} key={petSitter.id} petSitter={petSitter} />
                ))}
            </div>
        )
    } else {
        return <h1>... No pet sitters loaded yet ...</h1>
    }
}