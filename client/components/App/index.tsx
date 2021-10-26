import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

import NewBookDashboard from '../NewBookDashboard';
import BookDisplay from '../BookDisplay';
import BookSelect from '../BookSelect';
import LoginPage from '../LoginPage';
import NavBar from '../NavBar';
import { Book } from '../../types';
import './App.css';

import firebaseApp from '../../firebaseInit';

const App = (): JSX.Element => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [creatingBook, setCreatingBook] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
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
          setCreatingBook(!!books.length); // ??
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
                  {creatingBook ? (
                    <NewBookDashboard
                      setBooks={setBooks}
                      books={books}
                      setCreatingBook={setCreatingBook}
                    />
                  ) : (
                    <BookSelect
                      setBook={setCurrentBook}
                      books={books}
                      setCreatingBook={setCreatingBook}
                    />
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
