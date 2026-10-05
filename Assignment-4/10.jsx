import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('Tasks updated:', tasks);
  }, [tasks]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function deleteTask(index) {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function AddTask() {
  const [task, setTask] = useState('');
  const { addTask } = useContext(TaskContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (task.trim() !== '') {
      addTask(task);
      setTask('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList() {
  const { tasks, deleteTask } = useContext(TaskContext);

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task, index) => (
        <div key={index}>
          <p>
            {task}
            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <h1>Task Management</h1>
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
}

export default App;