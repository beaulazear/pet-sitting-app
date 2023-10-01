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

const welcomeMessageStyles = {
    fontFamily: 'Helvetica, sans-serif',
    maxWidth: '340px',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
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
                    <div style={welcomeMessageStyles}>
                        <div style={headerStyle}>Previously booked Pet Sitters:</div>
                    </div>
                    {previousSitters.map((sitter) => (
                        <PetSitterCard newRequestFromClientPage={newRequestFromClientPage} key={sitter.id} petSitter={sitter} user={user} />
                    ))}
                </div>
            )}
        </div>
    )
}