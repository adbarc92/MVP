import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import NewBookDashboard from './components/NewBookDashboard';
import BookDisplay from './components/BookDisplay';
import BookSelect from './components/BookSelect';
import { Book } from './types';

const App = (): JSX.Element => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  useEffect(() => {
    axios.get('/books').then((results) => {
      setBooks(results.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {currentBook ? (
            <BookDisplay book={currentBook} />
          ) : (
            <>
              {books.length ? (
                <BookSelect setBook={setCurrentBook} books={books} />
              ) : (
                <NewBookDashboard />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
