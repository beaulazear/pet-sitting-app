import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/user";
import PetSitterCard from "./PetSitterCard";

const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2',
};

export default function ClientPreviousSitters({ newRequestFromClientPage }) {

    const [previousSitters, setPreviousSitters] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user.client.petsitters) {
            let noRepeatSitters = [...new Map(user.client.petsitters.map((p) => [p.id, p])).values()]
            setPreviousSitters(noRepeatSitters)
        }
    }, [user.client.petsitters])

    return (
        <div>
            {previousSitters.length > 0 && (
                <div>
                    <h2 style={headerStyle}>Previous Pet Sitters:</h2>
                    {previousSitters.map((sitter) => (
                        <PetSitterCard newRequestFromClientPage={newRequestFromClientPage} key={sitter.id} petSitter={sitter} user={user} />
                    ))}
                </div>
            )}
        </div>
    )
}