import React, { useState } from 'react';
import styles from "../styles/invitation.module.css"

const Invitation = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitResult(true);

        const code = event.target.value;

        await fetchValidation(code);
    }

    const fetchValidation = async (code) => {
        const response = await fetch(
            '/api/invitation',
            {
                body: JSON.stringify(code),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }
        );

        const data = await response.json();

        updateSubmitResult(data.result);
    }

    const updateSubmitResult = (data) => {
        setSubmitResult(data);
    }

    const handleChange = (event) => {
        setCode(event.target.value)
    }

    const uuidPlacerHolder = "00000000-0000-0000-0000-000000000000"
    const [code, setCode] = useState("");
    const [submitResult, setSubmitResult] = useState(true);

    return (
        <div className={styles.invitation}>
            <div className={styles.invitationForm}>
                <form onSubmit={handleSubmit}>

                    <label className={styles.invitationLabel}>Enter Your Invitation Code</label>

                    <input className={styles.invitationInput}
                           type="text"
                           value={code}
                           onChange={handleChange}
                           onBlur={handleChange}
                           placeholder={uuidPlacerHolder} />

                    <input className={styles.invitationSubmit}
                           type="submit"
                           value="Submit"/>
                </form>
                {!submitResult
                    ? <div className={styles.submitResult}>The provided code is invalid or already in use.</div>
                    : <></>
                }
            </div>
        </div>
    )
};

export default Invitation
