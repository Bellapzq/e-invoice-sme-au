# Project Name: Business Process for SMEs Utilizing Frontend
### Project Overview

### Start Frontend
1. Clone the Repository
First, clone this repository to your local development environment:

2. Install Dependencies
Navigate to the project directory and run the following command to install the required dependencies:
cd Business_Process_for_SMEs_Utilizing/frontend
npm install

3.Start the Development Server
After installing the dependencies, use the following command to start the local development server:
npm start

**UI Design Guide:** https://www.figma.com/design/aTZGOthh6ZmD9QHRiB47OI/9900---Blank-Figma-File?node-id=0-1&t=b0tXH7xrCcBr9vAr-1

### Start backend


### Start SQL database （You don't need to do that before the log in function finish)

**About File sqlserver.tar**
User information and chating message is storaged in SQLserver project.

Attribute in table user_info: user_id (primary key), first_name, last_name, phone_number, email(UNIQUE), user_password, user_status 
Attribute in table contact_content: message_id (primary key), message_from_id, message_to_id, message_contant, is_reply

__How to Use the Docker Image (sqlserver.tar)__

***Step 1: Ensure Docker is Installed***

***Step 2: Download and Import the Docker Image***
1. Download the sqlserver.tar file.
2. Save the file to a location on your computer and remember its path.

Next, import the Docker image from the .tar file using this command:
docker load -i /path/to/sqlserver.tar

Replace /path/to/sqlserver.tar with the actual path where you saved the .tar file. This command will load the Docker image into your local Docker environment.

***Step 3: Run the SQL Server Container***
After importing the image, you can run the SQL Server container with the following command:
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Comp9900@' -p 1433:1433 --name sqlserver -d <image_name>

Replace <image_name> with the name of the image you just imported. To find the correct image name, use this command:
docker images

Look for the image you imported, which will have a name like mcr.microsoft.com/mssql/server, along with a tag (e.g., 2022-latest). Use this name and tag when running the container.

Example:
If the image name is mcr.microsoft.com/mssql/server:2022-latest, the command would look like this:
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Comp9900@' -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest

***Step 4: Managing the Container***
Stopping the Container:
To stop the container, use this command:
docker stop sqlserver

Restarting the Container:
To restart the container, use this command:
docker start sqlserver

Removing the Container:
If you no longer need the container, you can remove it with this command:
docker rm sqlserver

### Stage 1 

**Due time: Before due time of Demo A （October 13)**
| Name       | Task                                                                               |
|------------|------------------------------------------------------------------------------------|
| Bella      | Database backend set up, "Log-in" and "signup" frontend page set up                |
| Glofy      | Backend base set up, Swagger set up for the data storage of "My Account"           |
| Blythe     | "My Account" frontend page set up                                                  |
| Sheng      | "Home" page frontend page set up                                                   |
| Crystal    | "Home" page frontend page set up                                                   |

