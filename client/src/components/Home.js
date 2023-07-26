import React from 'react';
import PetSitterPage from './PetSitterPage';
import ClientPage from './ClientPage';

export default function Home({ user, handleLogout, updateUser }){

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
            <h1 style={headerStyle}>NYC Pet Sitters</h1>
            <PetSitterPage user={user} />
            <ClientPage updateUser={updateUser} user={user} />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

}