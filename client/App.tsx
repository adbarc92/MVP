import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

import initFbApp from './firebaseInit';

import NewBookDashboard from './components/NewBookDashboard';
import BookDisplay from './components/BookDisplay';
import BookSelect from './components/BookSelect';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import { Book } from './types';
import './App.css';

const App = (): JSX.Element => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    initFbApp();
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      }
    });

    if (user) {
      axios
        .get('/books')
        .then((results) => {
          setBooks(results.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className='app'>
      <NavBar setUser={setUser} user={user} />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {user ? (
            <>
              {currentBook ? (
                <BookDisplay
                  book={currentBook}
                  setBook={setCurrentBook}
                />
              ) : (
                <>
                  {books.length ? (
                    <BookSelect
                      setBook={setCurrentBook}
                      books={books}
                    />
                  ) : (
                    <NewBookDashboard setBooks={setBooks} />
                  )}
                </>
              )}
            </>
          ) : (
            <LoginPage setUser={setUser} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
