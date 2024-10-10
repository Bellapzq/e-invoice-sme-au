CREATE DATABASE comp9900;
USE comp9900;

-- Create table
CREATE TABLE user_info (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name NVARCHAR(50),
    last_name NVARCHAR(50),
    phone_number NVARCHAR(50),
    email NVARCHAR(100) UNIQUE,
    user_password NVARCHAR(100),
    user_status NVARCHAR(50) NULL
);

CREATE TABLE contact_content (
    message_id INT IDENTITY(1,1) PRIMARY KEY,
    message_from_id INT,
    message_to_id INT,
    message_contant NVARCHAR(500),
    send_time DATETIME
);

-- add data in the table
INSERT INTO user_info(first_name, last_name, phone_number, email, user_password, user_status)
VALUES ('Bella', 'Pang', '8888888', 'Bella@example.com','Bella123!','admin'),
('user', 'user', '12345678', 'user@example.com','user123!', NULL),
('admin', 'admin', '87654321', 'admin@example.com','admin123!','admin');

INSERT INTO contact_content(message_from_id, message_to_id, message_contant)
VALUES (2, 1, 'Test boolean.');

ALTER TABLE contact_content
ADD is_reply BIT DEFAULT 0;

