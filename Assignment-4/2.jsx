function Student(props) {
  return (
    <div>
      <h2>Student Information</h2>
      <p>Name: {props.name}</p>
      <p>Roll Number: {props.rollNumber}</p>
      <p>Course: {props.course}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Student Details</h1>

      <Student
        name="Aditi Kumari"
        rollNumber="2024053487"
        course="B.Tech CSE"
      />
    </div>
  );
}

export default App;