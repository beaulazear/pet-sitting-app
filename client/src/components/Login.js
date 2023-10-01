import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import '../App.css';

const formStyles = {
    formContainer: {
        marginTop: '20px',
        backgroundColor: '#f8f8f8',
        padding: '20px',
        marginRight: "50px",
        marginLeft: "50px",
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        fontSize: '16px',
        color: '#333',
        marginBottom: '5px'
    },
    input: {
        width: '96%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
    },
};

export default function Login() {

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((user) => {
                        setUser(user)
                    });
                } else {
                    response.json().then((errorData) => setErrors([errorData.error]))
                }
            })
        navigate("/")
    }

    return (
        <div style={formStyles.formContainer}>
            <form className="styled-form" onSubmit={handleSubmit}>
                <h2>User Login</h2>
                <div style={formStyles.formGroup}>
                    <label htmlFor="username" style={formStyles.label}>Username:</label>
                    <input autoComplete="on" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} style={formStyles.input} />
                </div>
                <div style={formStyles.formGroup}>
                    <label htmlFor="password" style={formStyles.label}>Password:</label>
                    <input type="password" id="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} style={formStyles.input} />
                </div>
                <button type="submit" style={formStyles.button}>Submit</button>
            </form>
            {errors.length > 0 && (
                <ul style={formStyles.errorList}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}