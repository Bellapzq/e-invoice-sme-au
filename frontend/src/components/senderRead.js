import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SenderRead = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/invoices/created', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(response.data);
                setDocuments(response.data);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
            }
        };

        fetchDocuments();
    }, []);

    const downloadDocument = async (documentName) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:5001/api/invoices/download/${documentName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob'
            });
    
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition 
                ? contentDisposition.split('filename=')[1].replace(/['"]/g, '') 
                : documentName;
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Failed to download document:", error);
        }
    };
    
    const viewDocument = async (documentName) => {
        const url = `http://localhost:5001/api/invoices/preview/${documentName}`;
        window.open(url, '_blank');
    };

    const sendDocument = async (documentName) => {
        const token = sessionStorage.getItem('token');
    
        try {
            await axios.put(`http://localhost:5001/api/invoices/send/${documentName}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentName === documentName ? { ...doc, if_send: 1 } : doc
                )
            );
        } catch (error) {
            console.error("Failed to send document:", error);
        }
    };

    return (
        <div>
            <h2>My Created Documents</h2>
            <ul>
                {documents.map((document) => (
                    <li key={document.DocumentName}>
                        <button onClick={() => viewDocument(document.DocumentName)}>Preview</button>
                        <p>{document.DocumentName}</p>
                        <p>From: {document.SenderEmail}</p>
                        <p>Status: {document.if_send === false ? <span>📧 (unsend)</span> : <span>📄 (sent)</span>}</p>
                        <p>Timestamp: {new Date(document.Timestamp).toLocaleString()}</p>
                        <button onClick={() => downloadDocument(document.DocumentName)}>
                            Download
                        </button>
                        <button 
                            onClick={() => sendDocument(document.DocumentName)} 
                            style={{ display: document.if_send === false ? 'inline' : 'none' }}
                        >
                            Send
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SenderRead;
