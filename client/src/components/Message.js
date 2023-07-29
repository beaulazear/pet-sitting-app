import React from "react";

const messageStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    margin: '0 auto',
    border: '4px solid #007bff', // Add a 4px solid border with a stylish blue color (#007bff)
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
};

const headingStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
};

const metaInfoStyle = {
    fontSize: '14px',
    color: '#888',
    marginBottom: '10px',
};

const messageBodyStyle = {
    fontSize: '16px',
    color: '#333',
};

export default function Message({ message }) {

    function parseTimestamp(timestamp) {
        const dateObj = new Date(timestamp);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}`

        return { date: formattedDate, time: formattedTime };
    }

    const { date, time } = parseTimestamp(message.created_at);

    console.log(date, time)
    console.log(message.created_at)
    console.log(message)

    return (
        <div style={messageStyle}>
            <h4 style={headingStyle}>Message from: {message.user.username}</h4>
            <p style={metaInfoStyle}>{date}, {time}</p>
            <p style={messageBodyStyle}>{message.body}</p>
        </div>
    )
}