import React, { useEffect, useState } from 'react';
// import TipTap from './components/TipTap';
import axios from 'axios';

const App = (): JSX.Element => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/books').then((results) => {
      setBooks(results.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Hello, things are loading</div>
      ) : (
        <div>Hello, things are loaded</div>
      )}
    </div>
  );
};

export default App;
