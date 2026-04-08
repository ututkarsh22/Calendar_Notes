# Calendar With Notes 
This is a calendar web app that allows users to create, edit, and manage tasks for specific dates.It is basically only frontend project means every notes is saving and deleting in localstorage only.

## Features
- Add tasks by date or you can add it for specific range
- Save the tasks and you can also delete the tasks.
- Notes support
- Local storage saving

## Tech Stack
- React
- JavaScript
- TailwindCSS
- LocalStorage


## Installation

1. Clone the repository:
   git clone https://github.com/ututkarsh22/Calendar_Notes.git

2. Go to project folder:
   cd Calendar_Notes

3. Install dependencies:
   npm install

4. Start the app:
   npm start

## Screenshots
![App Screenshot](.src/assets/app.png)
![Video](./src/assets/videoWebsite.mp4)

## Folder Structure
src/
├── assets/ # Images, icons, static files
├── components/ # UI Components
│ ├── Calendar.jsx
│ ├── ImageHero.jsx
│ └── NotesPanel.jsx
│
├── constants/ # Static data
│ └── calendarData.js
│
├── utils/ # Helper functions
│ └── calendarHelper.js
│
├── App.jsx # Main App component
├── App.css # App styles
├── index.css # Global styles
└── main.jsx # Entry point

## Usage
- Select a date
- Add a task
- Save it
- Tasks will persist using local storage

## License
This project is licensed under the MIT License.