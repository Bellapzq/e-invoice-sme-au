# Frontend

**Navigation Bar (NavBar.js)**
1. Navigation
2. "Login" button can switch to "Logout"
3. When identified as an admin, "Management" would appear in Navigation bar.

**LogIn (log-in.js)**
1. connect to home page and sign in page by <link>
2. If log in success, it will jump to home page.
3. If log in fail, the error message will appear below the input box.
4. User's status will be recognized while they log in
5. User's token will be set up and put in sessionStorage. (sessionStorage: information will be cleared when user log out or turn off browser.)
6. When user click "Remember me", their email will be remember.

**SignUp (sign-up.js)**
1. User can input their information in to the input boxes.
2. If the email have been used or password format is wrong or the confirm password doesn't match to password, the error information will appear below the input box.
3. User information will be inserted into databast while they sign up successful.

**user management (management.js)-Haven't finish**
1. Create a side navigation bar, which is the administrator interface with user management and message reply modules. (You need to create another component to complete it)
2. Using "User management (show user) API '/users'" with "async" and "axios.get" query all user information and show in this page.
(suggest using table)
3. Create an edit button for every user. After clicking the Edit button, a pop-up window containing the user information will appear. This pop-up window can change the user information and has a Submit button and a Close button. 
4. Using “User management (edit user) API '/users/:id'” with "async" and "axios.put" edit user information, and refresh list after submitting edit.
5.  Create an delete button for every user. When the administrator clicks the Delete button, a prompt will appear asking "Do you want to permanently delete the user?", along with buttons for "Confirm permanent deletion" and "Do not delete for now."
6. Using “User management (delete user) API '/users/:id'” with "async" and "axios.delete" delete user information, and refresh list after deleting.