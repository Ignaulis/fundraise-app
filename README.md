# Group Fundraising Platform

This project is a web platform for group fundraising, inspired by platforms like GoFundMe. It allows users to create and support various stories or ideas by contributing funds.

**Note:** This project was my first full-stack development endeavor.

## Key Features

The platform consists of a public area and an administration area, along with user registration and login functionalities.

**Public Area:**

* **Create New Story/Idea:** Registered users can create their own stories or ideas, upload an image, and specify a target fundraising amount.
* **List of Stories/Ideas:** Displays all approved stories/ideas where users can:
    * View the story/idea text.
    * See the associated image.
    * View the target fundraising amount.
    * See the currently raised amount.
    * See the remaining amount needed to reach the goal.
    * View a history of donations (donor name and amount).
    * Donate to a selected story/idea by entering their name and donation amount.

    The list is ordered with ongoing campaigns at the top and completed campaigns at the bottom. Completed campaigns are visually distinct and do not have donation input fields. Once a campaign reaches its target amount, further donations are disabled.
* **New Story/Idea Creation Page:** A dedicated page where users can input the details of their story/idea, including the text, an image, and the target amount.

**Administration Area:**

* Administrators can log in to a dedicated area.
* In the administration area, administrators can view all submitted stories/ideas.
* Administrators have the ability to approve or delete stories/ideas.
* Only administrator-approved stories/ideas are visible in the public area.

## Technologies Used

* **Backend:** Node.js with Express framework
* **Database:** MySQL
* **Frontend:** React

## Getting Started (Optional - you might want to add more detail later)

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
