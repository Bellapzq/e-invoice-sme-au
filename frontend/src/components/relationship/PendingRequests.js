import React, { useState, useEffect } from 'react';

function PendingRequests() {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    // Get pending requests
    const fetchPendingRequests = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5001/api/relationships/pending", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const pendingRequests = await response.json();
                setRequests(pendingRequests);
            } else {
                console.error("Failed to fetch pending requests");
                setMessage("Unable to obtain pending confirmation request, please try again later");
            }
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            setMessage("Unable to obtain pending request, please check network connection");
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    // Accept link request
    const acceptRequest = async (relationshipId) => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:5001/api/relationships/accept/${relationshipId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage("Request Accepted");
                fetchPendingRequests(); // Refresh the list of pending requests
            } else {
                const error = await response.json();
                console.error("Failed to accept request:", error.message);
                setMessage("Failed to accept the request, please try again");
            }
        } catch (error) {
            console.error("Error accepting request:", error);
            setMessage("Failed to accept the request, please check the network connection");
        }
    };

    // Reject link request
    const rejectRequest = async (relationshipId) => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:5001/api/relationships/reject/${relationshipId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage("Request denied");
                fetchPendingRequests(); // Refresh the list of pending requests
            } else {
                const error = await response.json();
                console.error("Failed to reject request:", error.message);
                setMessage("Failed to reject the request, please try again");
            }
        } catch (error) {
            console.error("Error rejecting request:", error);
            setMessage("Failed to deny request, please check network connection");
        }
    };

    return (
        <div>
            <h2>Pending linking requests</h2>
            {message && <p>{message}</p>}
            <ul>
                {requests.map((request) => (
                    <li key={request.RelationshipID}>
                        <p>Request from user ID: {request.RequesterID}</p>
                        <p>Request from user Email: {request.RequesterEmail}</p>
                        <p>Request Date: {new Date(request.RequestDate).toLocaleString()}</p>
                        <button onClick={() => acceptRequest(request.RelationshipID)}>Accept</button>
                        <button onClick={() => rejectRequest(request.RelationshipID)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PendingRequests;
