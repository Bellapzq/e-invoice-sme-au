import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");

    const fetchProfile = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5001/api/users/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data); // Set up company information
            } else {
                const error = await response.json();
                setMessage(error.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setMessage("Failed to fetch profile. Please check network connection.");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <h2>My Company Information</h2>
            {message && <p>{message}</p>}
            {profile ? (
                <ul>
                    <li>Company Name: {profile.company_name}</li>
                    <li>ABN: {profile.company_abn}</li>
                    <li>Unit Number: {profile.company_unit_number}</li>
                    <li>Address: {profile.company_address}</li>
                    <li>State: {profile.company_state}</li>
                    <li>Postal Code: {profile.company_postal_code}</li>
                </ul>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
