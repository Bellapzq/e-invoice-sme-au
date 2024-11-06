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

## November 6th update
( ✅ means backend and frontend finish connection)
### Company branch
**Related company information (My account)** ✅

（frontend/src/components/relationship/PartnerCompanies.js）
-	add a Search box
-	List 

**Create a connection request (My account)** ✅

（frontend/src/components/relationship/sendConnection.js）
-	Button “Create a connection”
-	Box with email input and request button

**Receives the association request and confirms (message box)** 

（frontend/src/components/relationship/PendingRequests.js）
-	Message icon in navigation bar
-	If have new message and haven’t read, there will be a red point near message icon

**Profile (My account)**

(frontend/src/components/profile.js)
(frontend/src/components/profileUpdate.js)
-   personal information show iin this page
-	edit personal information by "Edit" button in a small window

## Create invoice and Send
**The invoice I create (server type)**
-	List the invoice I create with paper icon, invoice name, if send
-	Click the paper to see the invoice content with ‘delete” button
-	Click “delete” -> small window pop up to make sure if the user want to delete
-	Invoice sorted by time

**The invoice I received (server type)**
-	List all the invoice I got with name, sender email
-	If read, the icon is a paper.
-	If unread, the icon is a closed envelop with a red point.
-	Click the paper to see the invoice content with ‘delete” button
-	Invoice sorted by time

**Creation input**
-	Click button “create invoice”. A small window pops up with input box input receiver email” and “Next” button. 
-	After click “Next”, if receiver not in your company branch, your creation will fail and get hint with a lick connect to my account company branch.
-	 If success, input product information (Glofy will tell you) with button “Next” button
-	After click “Next”, your invoice can be previewed, with button “send” and button “send next time”.
-	If click “send” -> small window close -> hint “Your invoice already send” pops up 
-	If click “send next time” -> small window close -> hint “Your invoice already collect in my creation” pops up

## Sign up page
- need to add input boxes with variable: company_name, company_abn, company_unit_number, company_address, company_state, company_postal_code


