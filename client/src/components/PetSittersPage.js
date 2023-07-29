import React, { useEffect, useState } from "react";
import PetSitterCard from "./PetSitterCard";

export default function PetSittersPage({ handleLogout, user }) {

    const [petSitters, setPetSitters] = useState(null)

    useEffect(() => {
        fetch("/petsitters")
            .then((response) => response.json())
            .then((petSitters) => {
                let newSitters = petSitters.filter((sitter) => sitter.user_id !== user.id)
                setPetSitters(newSitters)
            })
    }, [user.id])

    if (petSitters) {
        return (
            <div id="petSittersPageDiv">
                {user.client === null && (
                    <h3 style={{textAlign: "center"}}>Sign up as a client to interact with other pet sitters.</h3>
                )}
                {petSitters.map((petSitter) => (
                    <PetSitterCard user={user} key={petSitter.id} petSitter={petSitter} />
                ))}
            </div>
        )
    } else {
        return <h1>... No pet sitters loaded yet ...</h1>
    }
}