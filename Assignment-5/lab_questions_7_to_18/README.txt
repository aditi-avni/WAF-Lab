LAB PROGRAMS 7–18

HOW TO USE
1. Extract this ZIP file.
2. Node/Express programs are in the "node" folder.
3. React programs are in the "react" folder.
4. For Express programs, install Node.js, open a terminal in the extracted folder, and run:
      npm install express
   Then run a program, for example:
      node q7_student_api.js
   The program will tell you its port, or use port 5000 as shown in the code.
5. To test GET routes, open the URL in your browser. To test POST, PUT, and DELETE, use Postman.
   In Postman, choose Body > raw > JSON when sending data.
6. Each Express file is a separate program. Stop the current server with Ctrl+C before running another one on the same port.
7. React files are separate App.jsx examples. In a React/Vite project, replace src/App.jsx with the relevant file's contents.
   These examples use basic React and inline styling, so no extra CSS file is needed.
8. Question 14 is an Express server that returns simple HTML pages.

NOTE
The APIs use in-memory arrays, so changes disappear when the server restarts.
