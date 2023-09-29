import React from "react";
import { useState } from "react";

const formStyles = {
    formContainer: {
        backgroundColor: '#FFF3D0',
        padding: '20px',
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

export default function UpdatePetSitRequest({ deleteAppointmentRequest, appointment, updatePendingAppointments }) {

    const [appointment_information, setAppointmentInformation] = useState(appointment.appointment_information)
    const [start_date, setStartDate] = useState(appointment.start_date)
    const [end_date, setEndDate] = useState(appointment.end_date)
    const [errors, setErrors] = useState([])


    const [updateRequestButton, setUpdateRequestButton] = useState(false)
    const [buttonText, setButtonText] = useState("Update Request")

    function handleButtonToggle() {
        if (updateRequestButton === true) {
            setUpdateRequestButton(false)
            setButtonText("Update Request")
        } else {
            setUpdateRequestButton(true)
            setButtonText("Close Update Form")
        }
    }

    function patchProfile(e) {
        e.preventDefault()
        fetch(`/appointments/${appointment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                appointment_information,
                start_date,
                end_date
            })
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((newApt) => {
                        handleButtonToggle()
                        console.log(newApt)
                        updatePendingAppointments(newApt)
                        setAppointmentInformation(newApt.appointment_information)
                        setStartDate(newApt.start_date)
                        setEndDate(newApt.end_date)
                    })
                } else {
                    response.json().then((errorData) => {
                        console.log(errorData)
                        setErrors(errorData.errors)
                    })
                }
            })
    }

    function handleDelete() {
        fetch(`/appointments/${appointment.id}`, { method: "DELETE" })
            .then((resp) => resp.json())
            .then((updatedClient) => deleteAppointmentRequest(appointment.id, updatedClient))
    }

    return (
        <div style={formStyles.formContainer}>
            <button value={buttonText} className="acceptButton" onClick={handleButtonToggle}>{buttonText}</button>
            {updateRequestButton === true &&
                <div style={formStyles.formContainer}>
                    <form className="styled-form" onSubmit={patchProfile}>
                        <h2>Pet Sit Request Form</h2>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="appointment_information">
                                Appointment Information:
                            </label>
                            <textarea style={formStyles.input} type="text" id="appointment_information" value={appointment_information} onChange={(e) => setAppointmentInformation(e.target.value)} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="start_date">
                                Start Date:
                            </label>
                            <input style={formStyles.input} type="date" id="start_date" value={start_date} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div style={formStyles.formGroup}>
                            <label style={formStyles.label} htmlFor="end_date">
                                End Date:
                            </label>
                            <input style={formStyles.input} type="date" id="end_date" value={end_date} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <button type="submit">Update Request</button>
                    </form>
                    {errors.length > 0 && (
                        <ul style={formStyles.errorList}>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
            }
            <br /><br />
            <button onClick={handleDelete} className="declineButton" value="Cancelled">Cancel Pet Sit Request</button>
        </div>
    )
}