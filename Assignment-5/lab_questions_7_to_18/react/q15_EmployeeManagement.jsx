import React, { useState } from "react";

function Employee(props) {
    return (
        <div>
            <p>ID: {props.employee.id}</p>
            <p>Name: {props.employee.name}</p>
            <p>Department: {props.employee.department}</p>
            <button onClick={() => props.onEdit(props.employee)}>Edit</button>
        </div>
    );
}

export default function App() {
    const [employees, setEmployees] = useState([
        { id: 1, name: "Ravi", department: "IT" },
        { id: 2, name: "Maya", department: "HR" }
    ]);
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [editId, setEditId] = useState(null);

    function saveEmployee() {
        if (name === "" || department === "") {
            return;
        }

        if (editId === null) {
            let newEmployee = {
                id: employees.length + 1,
                name: name,
                department: department
            };
            setEmployees([...employees, newEmployee]);
        } else {
            let updatedEmployees = [];

            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id === editId) {
                    updatedEmployees.push({
                        id: editId,
                        name: name,
                        department: department
                    });
                } else {
                    updatedEmployees.push(employees[i]);
                }
            }

            setEmployees(updatedEmployees);
            setEditId(null);
        }

        setName("");
        setDepartment("");
    }

    function editEmployee(employee) {
        setEditId(employee.id);
        setName(employee.name);
        setDepartment(employee.department);
    }

    return (
        <div>
            <h1>Employee Management</h1>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Employee name"
            />
            <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department"
            />
            <button onClick={saveEmployee}>
                {editId === null ? "Add Employee" : "Update Employee"}
            </button>

            <h2>Employees</h2>
            {employees.map((employee) => (
                <Employee
                    key={employee.id}
                    employee={employee}
                    onEdit={editEmployee}
                />
            ))}
        </div>
    );
}
