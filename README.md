# Project Name: Business Process for SMEs Utilizing E-invoicing APIs
### Project Overview

### Start Frontend
1. Clone the Repository
First, clone this repository to your local development environment:

2. Install Dependencies
Navigate to the project directory and run the following command to install the required dependencies:

**cd Business_Process_for_SMEs_Utilizing/frontend**

**npm install**

3. Start the Development Server
After installing the dependencies, use the following command to start the local development server:

**npm start**

**UI Design Guide:** https://www.figma.com/design/aTZGOthh6ZmD9QHRiB47OI/9900---Blank-Figma-File?node-id=0-1&t=b0tXH7xrCcBr9vAr-1

### Start backend

**Start backend**

cd Business_Process_for_SMEs_Utilizing/backend

node server.js

### Start SQL database （Still need to be fixed)

**About File sqlserver**
User information and chating message is storaged in SQLserver project.


### Start SQL database 

***Step 1: Ensure Docker is Installed***

***Step 2: Clone the project from the code repository to your local***

***Step 3: Start the Docker container***
In the project root directory (where docker-compose.yml is located), run the following command to start the SQL Server container and initialize the database:

docker-compose up

***(optional) Verify the database***
After the Docker container starts, you can connect to SQL Server to verify that the database was created successfully by:

Connection string: You can use SQL Server Management Studio (SSMS) or Azure Data Studio to connect to SQL Server using the following information:

Server: localhost,1433
User: sa
Password: YourPassword123


**database information**

Table user_info
| user_id | first_name | last_name | phone_number | email               | user_password | user_status |
|---------|------------|-----------|--------------|---------------------|---------------|-------------|
| 1       | Bella      | Pang      | 8888888      | Bella@example.com   | Bella123!     | admin       |
| 2       | user       | user      | 12345678     | user@example.com    | user123!      | NULL        |
| 3       | admin      | admin     | 87654321     | admin@example.com   | admin123!     | admin       |

You can use this information start your log in.

Table contact_content
| message_id | message_from_id | message_to_id | message_contant | send_time | is_reply |
|------------|-----------------|---------------|-----------------|-----------|----------|
| 1          | 2               | 1             | Test boolean.   | NULL      | NULL     |

This table will be use for contaction.

### Stage 1 

**Due time: October 13**
| Name       | Task                                                                               |
|------------|------------------------------------------------------------------------------------|
| Bella      | Database backend set up, "Log-in" and "signup" frontend page set up                |
| Glofy      | Backend base set up, Swagger set up for the data storage of "My Account"           |
| Blythe     | "Service Type" frontend page set up                                                |
| Sheng      | "Home", "My Account" page frontend page set up                                     |
| Crystal    | "Home", "user management" page frontend page set up                                |

