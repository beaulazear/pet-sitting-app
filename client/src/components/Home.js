import React from 'react';
import PetSitterOpt from './PetSitterOpt';
import ClientOpt from './ClientOpt';

export default function Home({ user, handleLogout }){

    const headerStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#9e9e9e',
        width: '100%',
        fontSize: '36px',
        lineHeight: '1.2',
      };
      
    return (
        <div className='homePageDiv'>
            <h1 className="pageHeaders" style={headerStyle}>NYC Pet Sitters</h1>
            <PetSitterOpt user={user} />
            <ClientOpt user={user} />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

}