Invoice Management System
This is a simple invoice management system built with Node.js, Express, and MongoDB.

Table of Contents
Getting Started
Prerequisites
Installation
Running the App


Getting Started
To get started with this project, follow these steps:

Prerequisites
Make sure you have the following installed on your machine:

Node.js (version 10 or later)
npm (comes with Node.js)
MongoDB (version 4 or later)


Installation
1. Clone the repository:

  git clone https://github.com/aman1999hopper/Invoice_Generator.git

2. Navigate to the project directory:

  cd INVOICE_GENERATOR

3. Install the required dependencies:

  npm install

Running the App

1. Create a .env file in the root directory of the project and add your   MongoDB connection string:

  MONGODB_URI=mongodb://localhost:27017/invoice

2. Start the MongoDB server (if not already running).
3. Start the Node.js server:

  nodemon server.js 

  The server will start running on http://localhost:5000. You can now access the API endpoints for managing invoices.

4. To start the client server
   
   npm start
  



For example, to create an invoice, send a POST request to http://localhost:5000/api/invoices with the following JSON payload:
{
  "customerName": "John Doe",
  "invoiceNumber": "INV-001",
  "totalAmount": 100.00,
  "dueDate": "2022-01-31"
}

You can use tools like Postman or curl to test the API endpoints.

That's it! You have successfully set up and run the Invoice Management System.