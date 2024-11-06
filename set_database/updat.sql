USE comp9900;
DROP TABLE contact_content;

CREATE TABLE Relationships (
    RelationshipID INT PRIMARY KEY IDENTITY,  -- The unique identifier of the relationship
    RequesterID INT,                         -- The ID of the customer who initiated the association request. Foreign key references Customers(CustomerID)
    ReceiverID INT,                          -- The customer ID that receives the association request, foreign key reference Customers(CustomerID)
    Status NVARCHAR(20) DEFAULT 'Pending',   -- Association Status: Pending, Confirmed, Rejected
    RequestDate DATETIME DEFAULT GETDATE(),  -- The time when the request was initiated
    ExpiryDate DATETIME,                     -- (Optional) Expiration date of the association
    FOREIGN KEY (RequesterID) REFERENCES user_info(user_id),
    FOREIGN KEY (ReceiverID) REFERENCES user_info(user_id)
);

INSERT INTO Relationships(RequesterID, ReceiverID)
VALUES (1,2)

ALTER TABLE user_info
ADD company_name NVARCHAR(100) NULL,
    company_abn NVARCHAR(100) NULL,
    company_unit_number NVARCHAR(100) NULL,
    company_address NVARCHAR(200) NULL,
    company_state NVARCHAR(200) NULL,
    company_postal_code NVARCHAR(100) NULL,
    company_country NVARCHAR(50) NULL;

-- UPDATE user_info
-- SET company_name = 'Company A', company_abn = '83603272359', company_unit_number = 'Unit 445', company_address = 'Address A', company_state = 'NSW', company_postal_code = '2017', company_country = 'Australia'
-- WHERE user_id = 4;

-- UPDATE user_info
-- SET company_name = 'Company B', company_abn = '83603272123', company_unit_number = 'Unit 446', company_address = 'Address B', company_state = 'NSW', company_postal_code = '2018', company_country = 'Australia'
-- WHERE user_id = 5;

-- UPDATE user_info
-- SET company_name = 'Company C', company_abn = '83603272456', company_unit_number = 'Unit 447', company_address = 'Address C', company_state = 'NSW', company_postal_code = '2019', company_country = 'Australia'
-- WHERE user_id = 6;

CREATE TABLE Document (
    DocumentID INT PRIMARY KEY IDENTITY,        -- Unique identifier of the message
    SenderID INT,                              -- The sender's client ID
    ReceiverID INT,                            -- The client ID of the recipient
    DocumentName NVARCHAR(100),                -- File Name
    DocumentContent VARBINARY(MAX),              -- Message content
    Timestamp DATETIME DEFAULT GETDATE(),      -- Message sending time
    Status NVARCHAR(20) DEFAULT 'Unread',      -- Message status: Unread, Read
    FOREIGN KEY (SenderID) REFERENCES user_info(user_id),
    FOREIGN KEY (ReceiverID) REFERENCES user_info(user_id)
);

ALTER TABLE Document
ADD if_send BIT DEFAULT 0;  -- The default value is 0 (not sent)

-- if you want to check table, you can use query below:
SELECT * FROM Document
SELECT * FROM Relationships
SELECT * FROM user_info

-- UPDATE user_info
-- SET company_name = 'Company D', company_abn = '83603272777', company_unit_number = 'Unit 440', company_address = 'Address D', company_state = 'NSW', company_postal_code = '2011', company_country = 'Australia'
-- WHERE user_id = 2;

-- UPDATE Document
-- SET SenderID = 2, ReceiverID = 4, if_send = 1
-- WHERE DocumentID = 1;