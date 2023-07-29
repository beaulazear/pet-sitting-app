import React from "react";

const messageStyle = {
    backgroundColor: '#f2f7ff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px', // Increased padding for more space around the content
    marginBottom: '5px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    margin: '0 auto',
    border: '2px solid #007bff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6', // Slightly increased line height for better readability
    display: 'flex',
    flexDirection: 'column'
};

const headingStyle = {
    fontSize: '24px', // Increased font size for the heading
    fontWeight: 'bold',
    marginBottom: '8px',
    marginTop: '2px'
};

const metaInfoStyle = {
    fontSize: '14px',
    color: '#888',
    marginBottom: '6px' // Increased margin at the bottom for separation
};

const messageBodyStyle = {
    fontSize: '18px', // Increased font size for the main message body
    color: '#333',
    marginBottom: '10px' // Slightly increased margin at the bottom
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

    return (
        <div style={messageStyle}>
            <p style={headingStyle}>Message from: {message.user.username}</p>
            <p style={metaInfoStyle}>{date}, {time}</p>
            <p style={messageBodyStyle}>{message.body}</p>
        </div>
    )
}