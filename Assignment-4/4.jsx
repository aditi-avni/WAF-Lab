import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    setSubmittedName(name);
    setSubmittedEmail(email);
  }

  return (
    <div>
      <h1>Student Form</h1>

      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <br /><br />

        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <h2>Submitted Information</h2>
      <p>Name: {submittedName}</p>
      <p>Email: {submittedEmail}</p>
    </div>
  );
}

export default App;