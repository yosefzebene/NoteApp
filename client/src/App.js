import { useEffect, useState } from 'react';
import Main from './components/Main';
import Login from './components/Login';

const App = () => {
  const[token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <div className="App">
      {token ? <Main token={token} setToken={setToken} /> : <Login setToken={setToken} />}
    </div>
  );
};

export default App;
