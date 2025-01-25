# **Project README**

`Project Description`

This project is a full-stack task management and social post application. Users can authenticate through email verification via OTP or Google OAuth and manage tasks with drag-and-drop functionality (using react-dnd) between columns such as Pending, In Progress, and Done. Additionally, users can create and delete tasks or posts with titles, descriptions, and images.

The project utilizes React, TypeScript, Redux, Vite, and Tailwind CSS on the frontend, and Node.js, Express,Typescript and MongoDB on the backend. Key backend features include rate limiting, helmet for security, cloudinary for image storage, refresh and access token handling, and clean architecture.

Deployed froentend on **Netlify** and backend on **Render**

## **Note !**:
This application is deployed using the Render Free Tier. The initial load may take some time due to rendering limitations. If you encounter any delay, please refresh the page or copy and paste the deployed URL again to ensure the application loads properly.

**Deployed URLs:**

``Deployed url``: https://remarkable-lily-6b5367.netlify.app

``Postman API Documentation``: https://documenter.getpostman.com/view/33930780/2sAYQgfnXJ


# Features

## Frontend:

- Built with Vite, React, TypeScript, and Tailwind CSS.

- State management with Redux Toolkit and custom hooks for dispatch.

- Reusable components, such as input fields.

- Google OAuth for authentication

- Protected routes for authenticated users (private and public routes).

- React-dnd for drag-and-drop task management.

- User authentication:

- Email verification via OTP.

- Google OAuth integration.

- Forgot password functionality.

`Task management`:

+ Create tasks with titles and descriptions.

+ Drag and drop tasks across columns to update status.

+ Delete specific tasks.

+ Post creation:

+ Users can create posts with images and titles.

+ Posts are visible to all users.

## Backend:

- Built with Node.js, Express, and TypeScript.

- MongoDB for data storage.

- JWT authentication with refresh and access tokens.

- Security features:

- Rate limiter to prevent abuse.

- Helmet for securing HTTP headers.

- Image upload using Cloudinary and Multer middleware.

- Error handling middleware.

- Nodemailer for sending OTP emails.

- Backend and frontend validation for all authentication and task-related features.


# Steps to Run the Project

## Frontend

``Clone the repository``:
```bash
git clone https://github.com/ek-sree/affworld.git
```

``Navigate to the client directory``:
```bash
cd client
```

``Install dependencies``:

```bash
npm install
```

``Start the development server``:
```bash
npm run dev
```


## Backend

``Navigate to the server directory``:
```bash
cd server
```
``Install dependencies``:
```bash
npm install
```
``Start the development server``:
```bash
npm run dev
```
```(Optional) Build the backend```:
```bash
npm run build
```

```Run the built server```:
```bash
npm start
```


**Notes**

The backend does not require additional TypeScript dev dependencies as they are already included.

Ensure you have a **.env** file configured for both the frontend and backend.

For image uploads, make sure your Cloudinary account is set up and credentials are added to the .env file.



* # **Key Technologies**

## Frontend

1. React

2. TypeScript

3. Redux Toolkit

4. Tailwind CSS

5. React-dnd for drag-and-drop functionality

6. Google OAuth

## Backend

1. Node.js

2. Express

3. TypeScript

4. MongoDB

5. JWT authentication

6. Helmet for security

7. Rate limiter to prevent abuse

8. Cloudinary for image storage

   ![Screenshot (42)](https://github.com/user-attachments/assets/3e15aa78-2a88-4642-8918-9cbb2689fa82)
   ![Screenshot (43)](https://github.com/user-attachments/assets/0a92cc3e-21d1-4a61-bef4-725bf1ae7631)
   ![Screenshot (44)](https://github.com/user-attachments/assets/5e302148-9eda-4184-b331-ce2ed43a9ca0)
   ![Screenshot (45)](https://github.com/user-attachments/assets/70ecca9b-8d8e-457d-8a25-d39d0648b980)
   ![Screenshot (46)](https://github.com/user-attachments/assets/fd3368a0-6411-40dd-bb31-334cd18acbd4)






Feel free to explore the live project, APIs, and GitHub repository for further insights!
