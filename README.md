# Web-Security-Project

Dependancies

- express 5.1.0
- helmet 8.1.0

Testing Command

-"node server.js"

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
