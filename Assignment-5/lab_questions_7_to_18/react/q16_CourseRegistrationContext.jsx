import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

function CourseList() {
    const data = useContext(CourseContext);

    return (
        <div>
            <h2>Available Courses</h2>
            {data.courses.map((course) => (
                <div key={course}>
                    <span>{course} </span>
                    <button onClick={() => data.addCourse(course)}>Select</button>
                </div>
            ))}
        </div>
    );
}

function SelectedCourses() {
    const data = useContext(CourseContext);

    return (
        <div>
            <h2>Selected Courses</h2>
            {data.selected.length === 0 ? (
                <p>No courses selected</p>
            ) : (
                <ul>
                    {data.selected.map((course) => (
                        <li key={course}>{course}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function App() {
    const [selected, setSelected] = useState([]);
    const courses = ["Web Development", "Database Systems", "Computer Networks"];

    function addCourse(course) {
        if (!selected.includes(course)) {
            setSelected([...selected, course]);
        }
    }

    return (
        <CourseContext.Provider value={{ courses, selected, addCourse }}>
            <h1>Course Registration</h1>
            <CourseList />
            <SelectedCourses />
        </CourseContext.Provider>
    );
}
