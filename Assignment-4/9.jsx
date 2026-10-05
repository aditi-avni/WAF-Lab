import { createContext, useContext, useReducer } from 'react';

const AttendanceContext = createContext();

const initialState = [
  { id: 1, name: 'Aditi', present: false },
  { id: 2, name: 'Rahul', present: false },
  { id: 3, name: 'Priya', present: false }
];

function reducer(state, action) {
  switch (action.type) {
    case 'MARK_PRESENT':
      return state.map((student) =>
        student.id === action.id
          ? { ...student, present: true }
          : student
      );

    default:
      return state;
  }
}

function AttendanceProvider({ children }) {
  const [students, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <AttendanceContext.Provider value={{ students, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
}

function Attendance() {
  const { students, dispatch } = useContext(AttendanceContext);

  return (
    <div>
      <h1>Student Attendance</h1>

      {students.map((student) => (
        <div key={student.id}>
          <p>
            {student.name} -{' '}
            {student.present ? 'Present' : 'Absent'}
          </p>

          <button
            onClick={() =>
              dispatch({
                type: 'MARK_PRESENT',
                id: student.id
              })
            }
          >
            Mark Present
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <AttendanceProvider>
      <Attendance />
    </AttendanceProvider>
  );
}

export default App;