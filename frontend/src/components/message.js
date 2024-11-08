import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationBanner = () => {
    const [notifications, setNotifications] = useState({ hasPendingConnections: false, hasUnreadDocuments: false });
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5001/api/notifications/new', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setNotifications(response.data);
        })
        .catch(error => {
            console.error("Failed to fetch notifications:", error);
        });
    }, [token]);

    return (
        <>
            {notifications.hasPendingConnections && <p>You have pending connection requests.</p>}
            {notifications.hasUnreadDocuments && <p>You have unread documents.</p>}
        </>
    );
};

export default NotificationBanner;