import React, { useEffect, useState } from "react";
import PetSitterCard from "./PetSitterCard";

const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2'
};

export default function PetSittersPage({ user }) {

    const [petSitters, setPetSitters] = useState(null)

    useEffect(() => {
        fetch("/petsitters")
            .then((response) => response.json())
            .then((petSitters) => {
                let newSitters = petSitters.filter((sitter) => sitter.user_id !== user.id && sitter.currently_available === true)
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
        return <h1 style={headerStyle}>... No pet sitters loaded yet ...</h1>
    }
}