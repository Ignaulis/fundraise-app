# Group Fundraising Platform

This is my first full-stack project. The goal was to create a group fundraising web platform similar to [GoFundMe](https://www.gofundme.com/), using modern web technologies.

## 🛠️ Tech Stack

- **Frontend**: React, Scss
- **Backend**: Node.js, Express
- **Database**: MySQL

## 🌐 Features

### Public Area

#### 📜 List of Stories/Ideas
- Displays all submitted stories/ideas.
- Each item shows:
  - Story text
  - Image
  - Target amount
  - Amount raised so far
  - Remaining amount
  - Donation history (donor name and amount)
  - Donation form with two fields: donor name and donation amount

> Stories that have not yet reached their goal are shown at the top.  
> Stories that have reached their target are displayed differently (with a success message and disabled donation form).

#### ➕ Create a New Story/Idea
- Available to all registered users
- Users can submit:
  - A short story or idea
  - An image
  - The target fundraising amount

### Admin Area

- Accessible only to users with admin rights
- Admins can:
  - View all submitted stories/ideas
  - Approve or delete submissions
- Only approved stories/ideas are visible in the public area

### 🔐 Authentication

- User Registration
- User Login
- Admin role-based access control

## 📦 Installation

To run this project locally, you will need to have Node.js, npm (or yarn), and MySQL installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone [repository URL]
    ```
2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    # or
    yarn install
    ```
3.  **Set up the MySQL database:**
    * Create a database for the project.
    * Configure the database connection details in the backend application (e.g., in a `.env` file or configuration file).
    * Run migrations or import a database schema (if provided).
4.  **Run the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
5.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    # or
    yarn install
    ```
6.  **Configure the frontend to connect to the backend (if necessary, e.g., API endpoint).**
7.  **Run the frontend development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

Please refer to the individual `backend` and `frontend` directories for more specific setup instructions and configuration options.

## 📚 License

```text
This project is open-source and free to use.
