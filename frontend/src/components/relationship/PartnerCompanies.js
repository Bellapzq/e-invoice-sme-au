import React, { useState, useEffect } from 'react';

function PartnerCompanies() {
    const [partners, setPartners] = useState([]);
    const [message, setMessage] = useState('');

    // Get related company information
    const fetchPartnerCompanies = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5001/api/relationships/partners", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPartners(data);
            } else {
                console.error("Failed to fetch partner companies");
                setMessage("Unable to obtain the associated company information, please try again later");
            }
        } catch (error) {
            console.error("Error fetching partner companies:", error);
            setMessage("Unable to obtain associated company information, please check the network connection");
        }
    };

    useEffect(() => {
        fetchPartnerCompanies();
    }, []);

    return (
        <div>
            <h2>Related company information</h2>
            {message && <p>{message}</p>}
            <ul>
                {partners.map((partner) => (
                    <li key={partner.user_id}>
                        <h3>{partner.company_name}</h3>
                        <p>Email: {partner.email}</p>
                        <p>Phone: {partner.phone_number}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PartnerCompanies;
