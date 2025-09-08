# Business Process for SMEs Utilizing E-invoicing APIs  

A full-stack platform designed to support SMEs with **compliant e-invoicing workflows**, enabling invoice creation, delivery, and management with secure API integration.  

## Features  
- **Frontend (React.js):** User-friendly interface for invoice management, account profiles, and service types.  
- **Backend (FastAPI & Express.js):** RESTful APIs for invoice creation, user authentication, and data management.  
  - **FastAPI:** Provides API endpoints and integrated Swagger-UI for testing.  
  - **Express.js:** Provides modular backend services with Swagger documentation and API testing support.  
- **Database (SQL Server with Docker):** Persistent storage with user and invoice tables; initialized through Docker Compose.  
- **Documentation:** Swagger-UI for both FastAPI and Express.js backends.  

## Architecture  
```plaintext
Frontend (React.js)
       |
       v
Express.js Backend (Swagger, API testing) <-> SQL Server (Docker)
       |
       v
FastAPI Backend (Swagger, API testing)
```

## Start Frontend
1. Clone the Repository
First, clone this repository to your local development environment:

2. Install Dependencies
Navigate to the project directory and run the following command to install the required dependencies:

```bash
$ cd frontend
$ npm install
```


3. Start the Development Server
After installing the dependencies, use the following command to start the local development server:

```bash
$ npm start
```
4. Test Frontend by 'http://localhost:3000/'


**UI Design Guide:** https://www.figma.com/design/aTZGOthh6ZmD9QHRiB47OI/9900---Blank-Figma-File?node-id=0-1&t=b0tXH7xrCcBr9vAr-1

## Backend
Now we have two backend, FastAPI backend and ExpressJS backend. You have to set up **both** of them.
### FastAPI Backend Start
1. Start **Docker**
2. Initialize Backend Server

```bash
$ cd FastAPI_backend
$ make up
```
If all good. It will start install automatically by docker. The default port for backend is `5002`.

3. Testing with **Swagger-UI**

`http://localhost:5002/docs`

4. Finish testing
```bash
$ make down
```
Clear the cache in your computer.

### ExpressJS Backend Start
```bash
$ cd ExpressJS_backend
$ npm install
$ node server.js
```

## Database
### Start SQL database 
( After install sqlserver in your docker, you don't need to install it again. You just need to keep turn on the sqlserver in your docker.)

1. Ensure Docker is Installed

2. Clone the project from the code repository to your local

3. Start the Docker container
In the project root directory (where docker-compose.yml is located), run the following command to start the SQL Server container and initialize the database:

```bash
$ docker-compose up
```

***(optional) Verify the database***
After the Docker container starts, you can connect to SQL Server to verify that the database was created successfully by:

Connection string: You can use SQL Server Management Studio (SSMS) or Azure Data Studio to connect to SQL Server using the following information:

Server: localhost,1433
User: sa
Password: @Comp9900


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

### Stage 3
| Name       | Task                                                                               |
|------------|------------------------------------------------------------------------------------|
| Bella      | Database update, simple Frontend and backend: account relationship, profile, read invoice, send invoice, upload test              |
| Glofy      | Backend: invoice creation           |
| Blythe     |                                            |
| Sheng      |                                     |
| Crystal    | "Home", "user management" page frontend page set up                                |
