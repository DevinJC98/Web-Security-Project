# Web-Security-Project

**Dependancies**

- express 5.1.0
- helmet 8.1.0
- argon2 0.43.0
- body-parser 2.2.0
- connect-mongo 5.1.0
- csurf 1.11.0
- dotenv 17.0.1
- express-session 1.18.1
- jsonwebtoken 9.0.2
- mongoose 8.16.1
- xss 1.0.15
- ejs 3.1.10

**Testing instructions**

- clone the repository
- click on the green code button in the repository in github.
- open the repository through github desktop
- set up the repository locally on your device & open with a code editor of your choice
- open the terminal and cd into Web-Security-Project
- install all the dependancies listed above using "npm i"
- run the server with "node server.js"

**Phase 3 reflection**

- The first thing i had to do to get this phase started was display information on the user dashboard. This took signifigantly longer than i expected as my user returned undefined. It took a while to fix the issue and i wasted a lot of time handling logins through postman before i realized i needed to use a template editor like ejs.
- with ejs i created two html pages. one for the default route that is used for logins, and a second for the user dashboard which is used to display and update user information.
- both pages contain forms with links to routes. the /register route still uses postman to create the user, the /login route is now handled within a form at the default page, and a /update route has been created using a PUT request that is handled by the form on the user dashboard.
- the dashboard.js file takes the token recieved on login, splits it, and decoded the payload to pull out specific pieces, which can then be displayed on the page.
- each form has basic restrictions that define the type ad length of the inputs as well as regex patterns to restrict special characters
- xss is used to sanitize inputs
- after running npm audit, i found that the dependencies have 4 low severity vulnerabilities. this is not enough of a concern at the moment, but if the dependencies get more outdated in the future, it could raise more security concerns.
- I am not sure how to address sql injection attacks, i still need to read more on the topic.

**Phase 2 Reflection**

- during this phase of the project, i set up authentification and authorization capabilities for the server. passwords are hashed with argon2 and i implemented session management and rbac.
- There are currently two roles set up. users and admins. currently this isn't relevant to any of the standard pages of the app, but there is a protected route for the admin user role.
- One of the main challeges i faced was implementing sso capabilities. I missed two days of class which involved the labs where we would have learned how to use google oauth20, in the end i did not give myself enough time to properly break down the example code provided and impliment this and i had to leave sso out of my app for this phase.
- throughout the process i primarily tested to routes and authentification using mongodb and postman to ensure that everything was working.

Set-Up

- When creating this app, i began by initializing the project with node, as well as installing all the dependancies i needed for this phase, namely being Express and Helmet. Once the development enviroment was set-up I began defining the routes the app would use, set-up the hanshake certificates, and created the https app using express on localhost port 3000. throughout the process I tested the app by running the server using the command "node server.js"

Project Purpose

- This project is being developed for CPRG-312-A Project: Phase 1 - Establishing a Secure HTTPS Server.
- The Application I chose from the list provided is the Daily Quest Tracker. I feel this will be the most interesting app to create as I play a lot of video games and those can serve as inspiration for me.

Part B Reflection - Configure SSL Certificates

- The SSL Certificate and key were generated using openssl. As I am using a windows device, this is a bit of an annoying step due to needing to use Git to run the command that creates the certificates. All though this is an irritating process for me, I have no experience using Let's Encrypt. I copied over the self signed certificates I previously created for the labs in class. In the future however it may be worth lookin into other methods of creating these certificates.

Part C Reflection - Implement Secure HTTP Headers

- For this part of the assignment I set up a secure HTTPS server using the certificates from part B. Having done this multiple times during labs in class, this was relatively simple. At it's current stage this app only has two dependancies. Express and Helmet. I currently am not very knowledgable about Helmet and it's uses, but I am aware that just adding it to the app without any additional configuration will add an extra layer to the applications security. In the future it will be worth looking into configuring helmet further to increase the security of the app even more.

Part D Reflection - Part D: Design Routes and Implement Cache Control

- For this application I created 5 routes. The Home Page and About Page will not change frequently so i chose not to store any information in the cache. The user accounts page also doesn't cache any information, but this is to protect sensitive user information. The remaining two paged are daily and weekly quests. For these two pages it makes the most sense to me to store the daily quest information for 24 hours, and the weekly quest information for 7 days.
