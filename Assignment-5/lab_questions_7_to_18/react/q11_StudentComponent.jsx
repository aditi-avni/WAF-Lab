import React from "react";

function Student(props) {
    return (
        <div>
            <h2>Student Details</h2>
            <p>Name: {props.name}</p>
            <p>Branch: {props.branch}</p>
            <p>Semester: {props.semester}</p>
        </div>
    );
}

export default function App() {
    return (
        <div>
            <Student name="Aditi" branch="CSE" semester="5th" />
            <Student name="Lahari" branch="IT" semester="5th" />
        </div>
    );
}
