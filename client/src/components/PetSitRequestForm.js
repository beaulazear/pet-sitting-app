import React, { useState } from "react";

export default function PetSitRequestForm({ petSitter, user }) {

    const [appointment_information, setAppointmentInformation] = useState("")
    const [start_date, setStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    const [boarding, setBoarding] = useState(true)
    const [in_house, setInHouse] = useState(true)
    const [errors, setErrorData] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        console.log(user)
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
                        window.alert("Appointment was requested!")
                        setAppointmentInformation("")
                        setBoarding(true)
                        setInHouse(true)
                        setStartDate("")
                        setEndDate("")
                        setErrorData([])
                        console.log(apt)
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
            <div className="form-container">
                <form className="styled-form" onSubmit={handleSubmit}>
                    <h2>Pet Sit Request Form:</h2>
                    <div className='form-group'>
                        <label htmlFor="appointment_information">Appointment Information:</label>
                        <textarea
                            type="text"
                            className="appointment_information"
                            value={appointment_information}
                            onChange={(e) => setAppointmentInformation(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="start_date">Start Date:</label>
                        <input
                            type="date"
                            className="start_date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="end_date">End Date:</label>
                        <input
                            type="date"
                            className="end_date"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="housesit">Interested in house sitting:</label>
                        <select onChange={handleHouseSitSelect} className="house_sit">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="boarding">Interested in boarding:</label>
                        <select onChange={handleBoardingSelect} className="boarding">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button>Request a pet-sit</button>
                    {errors.length > 0 && (
                        <ul style={{ color: "red" }}>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
        )
    } else {
        return (<div id="emptyAppointmentFormDiv">
            <h4>Sign up as a client to request an appointment with this pet sitter!</h4>
        </div>)
    }
}