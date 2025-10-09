//Henya Ecommerce platform - realworld project//

Welcome to Henya - a fullstack ecommerce platform demonstrating my knowledge of frontend and backend work.

Tech Stack

- React (frontend with Sass transcriber)
- Nodejs (Backend server for e.g. routing, database modelling)
- MongoDB (Database)
- Express (Routing library)

It encorporates the following features:

- Fully custom built integrated CMS for admin control panel (updating database, seeing users, orders etc.)
- Real integration of Payfast API (DO NOT USE ANY REAL INFORMATION WHEN TESTING)
- Custom development environment and tools setup for DB editing and building static files
- Frontend state and cookie management to have saved info when reloading the page
- Authentication and encryption techniques for passwords and users
- Guest mode for easy navigation and testing
- Much more! dig into the open source repo to see everything I have done

This project encorporates a pre-built dev environment for ease of setup in frontend/build
The majority of open source code is listed in the backend/\* and frontend/public folders
The .env file is PURPOSEFULLY left in so anybody can test the app locally. All passwords and necessary security risks have been considered.

_How to setup_
To setup locally, simply run npm install -y to setup node_modules
Then to run locally use npm run server
This will automatically connect the MongoDB database to the server and start the app

_How to connect as admin user and see backend custom CMS_
Use the following credentials to login and see the backend CMS
name: 'Admin User',
email: 'admin@example.com'

_Example user to connect and see user perspective_
name: 'John Doe',
email: 'john@example.com'
