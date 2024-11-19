Тo-Do Application with Customizable Lists
This project is a React-based application designed to manage multiple To-Do lists with individual task details. Users can create and name To-Do lists, view them in a grid layout, and interact with tasks in detail. The application is styled using SCSS modules with global theming support.

Features
Multiple To-Do Lists:

Create, edit, and delete lists.
Customize list names (e.g., "Work", "Family").
View lists in a responsive grid format.
Task Management:

Add, edit, delete tasks within lists.
View task details in a dedicated page.
Responsive Design:

Optimized for various screen sizes and devices.
Light and dark theme support (customizable).
Centralized SCSS Styling:

Styles are modular and globally managed in main.scss.
Authentication Support:

User registration and login page.
Redirects users based on authentication status.
Technologies Used
Frontend: React, TypeScript
State Management: Context API / React State
Styling: SCSS with modular and global styles
Routing: React Router DOM
API Integration: Axios for backend communication

Setup and Installation
Prerequisites
Node.js (>=16)
npm (>=7) or yarn
Installation
Clone the repository:

bash
Install dependencies:

bash
npm install
Start the development server:

bash

npm start
Open your browser and navigate to: http://localhost:3000

Available Scripts
npm start
Runs the application in development mode.

npm run build
Builds the app for production.

npm test
Launches the test runner.

npm run lint
Runs the linter for code quality checks.

Themes
To switch between themes, update the themes.scss file. Use predefined variables for colors and apply global changes easily.

Future Improvements
Implement drag-and-drop functionality for tasks.
Add reminders and due date notifications.
Improve animations and visual effects.
Add support for sharing To-Do lists.