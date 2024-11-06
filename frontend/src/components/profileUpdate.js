import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [companyInfo, setCompanyInfo] = useState({
        company_name: '',
        company_abn: '',
        company_unit_number: '',
        company_address: '',
        company_state: '',
        company_postal_code: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    // Get company information
    useEffect(() => {
        axios.get("http://localhost:5001/api/users/profile", {

            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, // The token is placed in the request header
            },
        })
        .then(response => {
            setCompanyInfo(response.data); // Set up company information
        })
        .catch(error => {
            console.error('Failed to fetch profile:', error);
        });
    }, []);

    // Submit an update request
    const handleSave = () => {
        axios.put("http://localhost:5001/api/users/profile", companyInfo, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
        .then(response => {
            setCompanyInfo(response.data); // Updated company information
            setIsEditing(false); // End editing state
            alert('Profile updated successfully');
        })
        .catch(error => {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
        });
    };

    // Handling input box changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Company Information</h2>
            <div>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="company_name"
                        value={companyInfo.company_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>
                <br />
                <label>
                    Company ABN:
                    <input
                        type="text"
                        name="company_abn"
                        value={companyInfo.company_abn}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>
                <br />
                <label>
                    Unit Number:
                    <input
                        type="text"
                        name="company_unit_number"
                        value={companyInfo.company_unit_number}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        name="company_address"
                        value={companyInfo.company_address}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>
                <br />
                <label>
                    State:
                    <input
                        type="text"
                        name="company_state"
                        value={companyInfo.company_state}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>
                <br />
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="company_postal_code"
                        value={companyInfo.company_postal_code}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>
                <br />
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default Profile;
