To run the project, run the following lines:
   
   npm i
   %To install all required package

Make sure .env file are placed alongside index.js 

After getting .env file run:
   
   npm index.js 
    %or

   (nodemon i)
    %if nodemon is installed

API will be running on http://localhost:5000/, and you should see hello world. 

Log in to MongoDB Atlas, and you will see all testing data.

All models are in model folder 

All routes are in router folder 
%All routes are in the form: http://localhost:5000/api

Controller folder contains are requests: CRUD

helper.js in controller folder helps check if user is logged in and append information to users.

