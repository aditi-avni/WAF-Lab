import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button onClick={() => setDark(!dark)}>
      Switch to {dark ? 'Light' : 'Dark'} Theme
    </button>
  );
}

function Content() {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black',
        padding: '30px'
      }}
    >
      <h1>{dark ? 'Dark Theme' : 'Light Theme'}</h1>
      <ThemeButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

export default App;