# Backend 

 port = 5001;

**Start backend**

cd Business_Process_for_SMEs_Utilizing/backend

node server.js

**server.js:** 
1. set up app listen port: 5001
2. set up Routers

**Routes**
###  userRoutes: All user related API routes is in here.
1. Login API '/login'

Use method "post" to query email and password in sqldatabase. If result is not empty, login seeccess and a token will be set up. This API also can identifies the status of the user, like user or admin.
2. Register API '/sign-up'

Use method 'post' to check if the email exited first.Then, insert all the input into database.
3. User management (show user) API '/users'

Use "get" method to query all the user information from database
4. User management (edit user) API '/users/:id'

Use "put" method to update the input after edit.
5. User management (delete user) API '/users/:id'

Use "delete" method to remove the user.

**config/dbConfig.js:** storage the database information whitch is used for database API setup.

