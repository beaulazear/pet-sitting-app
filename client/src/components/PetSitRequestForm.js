import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

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
    select: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff'
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

export default function PetSitRequestForm({ newRequestFromClientPage, petSitter, updateDisplayForm }) {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    const [appointment_information, setAppointmentInformation] = useState("")
    const [start_date, setStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    const [boarding, setBoarding] = useState(true)
    const [in_house, setInHouse] = useState(true)
    const [errors, setErrorData] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                appointment: {
                    appointment_information: appointment_information,
                    start_date: start_date,
                    end_date: end_date,
                    boarding: boarding,
                    in_house: in_house,
                    petsitter_id: petSitter.id,
                    client_id: user.client.id
                },
            }),
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((apt) => {
                        setAppointmentInformation("")
                        setBoarding(true)
                        setInHouse(true)
                        setStartDate("")
                        setEndDate("")
                        setErrorData([])
                        updateDisplayForm()
                        navigate("/clientpage")
                        if (newRequestFromClientPage) {
                            newRequestFromClientPage(apt)
                        }
                    });
                } else {
                    response.json().then((errorData) => {
                        console.log(errorData)
                        setErrorData(errorData.errors)
                    })
                }
            });
    }

    function handleBoardingSelect(e) {
        if (e.target === "Yes") {
            setBoarding(true)
        } else {
            setBoarding(false)
        }
    }

    function handleHouseSitSelect(e) {
        if (e.target === "Yes") {
            setInHouse(true)
        } else {
            setInHouse(false)
        }
    }

    if (user.client) {
        return (
            <div style={formStyles.formContainer}>
                <h2>Pet Sit Request Form:</h2>
                <form className="custom-form" onSubmit={handleSubmit}>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="appointment_information" style={formStyles.label}>Appointment Information:</label>
                        <textarea type="text" className="custom-input" value={appointment_information} onChange={(e) => setAppointmentInformation(e.target.value)} style={formStyles.input} />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="start_date" style={formStyles.label}>Start Date:</label>
                        <input type="date" className="custom-input" value={start_date} onChange={(e) => setStartDate(e.target.value)} style={formStyles.input} />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="end_date" style={formStyles.label}>End Date:</label>
                        <input type="date" className="custom-input" value={end_date} onChange={(e) => setEndDate(e.target.value)} style={formStyles.input} />
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="housesit" style={formStyles.label}>Interested in house sitting:</label>
                        <select onChange={handleHouseSitSelect} className="custom-select" style={formStyles.select} >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div style={formStyles.formGroup}>
                        <label htmlFor="boarding" style={formStyles.label}>Interested in boarding:</label>
                        <select onChange={handleBoardingSelect} className="custom-select" style={formStyles.select} >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button style={formStyles.button}>Request a pet-sit</button>
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
    } else {
        return (<div id="emptyAppointmentFormDiv">
            <h4>You must be signed up as a client to request an appointment with this pet sitter!</h4>
        </div>)
    }
}