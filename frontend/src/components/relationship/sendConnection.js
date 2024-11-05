import React, { useState } from 'react';

function SendConnection() {
    const [receiverEmail, setReceiverEmail] = useState('');
    const [message, setMessage] = useState('');

    // Function to send association request
    const sendRelationshipRequestByEmail = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5001/api/relationships/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ receiverEmail }) // Send email to the backend
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Relationship request sent:", result.message);
                setMessage("The request has been sent, please wait for the other party to confirm");
            } else {
                const error = await response.json();
                console.error("Failed to send request:", error.message);
                setMessage("Request failed, please try again");
            }
        } catch (error) {
            console.error("Error sending relationship request:", error);
            setMessage("The request failed to send, please check the network connection");
        }
    };

    // Form submission processing function
    const handleSubmit = (event) => {
        event.preventDefault();
        sendRelationshipRequestByEmail();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter recipient's email:
                    <input
                        type="email"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        placeholder="Enter recipient's email"
                        required
                    />
                </label>
                <button type="submit">Send Relationship Request</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SendConnection;
