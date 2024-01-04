import React, { useContext } from 'react';
import { UserContext } from '../context/user';

const welcomeMessageStyles = {
    fontFamily: 'Helvetica, sans-serif',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
};

const headingStyles = {
    fontSize: '32px',
    marginBottom: '20px',
    color: 'black',
};

const paragraphStyles = {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '16px',
};

export default function Home() {
    const { user } = useContext(UserContext);

    return (
        <div style={welcomeMessageStyles}>
            <h1 style={headingStyles}>Welcome, {user.username}!</h1>
            <p style={paragraphStyles}>
                We're thrilled to have you here and embark on a journey of connecting pet sitters to loving clients in the heart of New York City. Whether you're a seasoned pet sitter or a caring pet owner, NYCPetSitters is the perfect platform for you.
            </p>
            <p style={paragraphStyles}>
                Our mission is to connect independent animal caretakers with clients in need of support. Our pet sitters range from locals who do this professionally to out-of-towners who like to trade their pet sitting services for a stay in the big apple!
            </p>
            <p style={paragraphStyles}>
                Explore our community of experienced pet sitters who are eager to shower your pets with love and attention. For pet sitters, this is an excellent opportunity to connect with caring clients who share the same passion for animals.
            </p>
            <p style={paragraphStyles}>
                Wagging tails and happy purrs await you! Visit the "Petsitter Page" to set up your petsitter account, or visit the "Client Page" to set up your client account. All active petsitters can be viewed on the "View Pet Sitters" page. If registered as a client, a Pet Sit Request form will be available for each pet sitter.
            </p>
        </div>
    );
}
