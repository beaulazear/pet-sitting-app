import React, { useState } from 'react';
import '../App.css';

const formStyles = {
  formContainer: {
    marginTop: '20px',
    backgroundColor: '#f8f8f8',
    padding: '20px',
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
    width: '100%',
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
  errorList: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'left',
    paddingLeft: '20px'
  },
};

export default function Signup({ onLogin }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errors, setErrors] = useState([])

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => onLogin(user));
        } else {
          response.json().then((errorData) => setErrors(errorData.errors))
        }
      })
  }
  
  return (
    <div style={formStyles.formContainer}>
      <form className="styled-form" onSubmit={handleSubmit}>
        <h2>Signup Here</h2>
        <div style={formStyles.formGroup}>
          <label htmlFor="signupUsername" style={formStyles.label}>Username:</label>
          <input type="text" id="signupUsername" autoComplete="on" value={username} onChange={(e) => setUsername(e.target.value)} style={formStyles.input} />
        </div>
        <div style={formStyles.formGroup}>
          <label htmlFor="signupPassword" style={formStyles.label}>Password:</label>
          <input type="password" id="signupPassword" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} style={formStyles.input} />
        </div>
        <div style={formStyles.formGroup}>
          <label htmlFor="password_confirmation" style={formStyles.label}>Confirm Password:</label>
          <input type="password" id="password_confirmation" autoComplete="on" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} style={formStyles.input} />
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
