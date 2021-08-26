import React, { useState } from 'react';
import { TextField, Container, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Book } from '../../types';
import axios from 'axios';
import './NewBookDashboard.css';

interface NewBookDashboardProps {
  setBooks: (books: Book[]) => void;
}

const NewBookDashboard = ({
  setBooks
}: NewBookDashboardProps): JSX.Element => {
  const [name, setName] = useState('');
  const [textBody, setTextBody] = useState('');
  const [triedSubmit, setTriedSubmit] = useState(false);

  const handleClick = () => {
    setTriedSubmit(true);
    if (name !== '' && textBody !== '') {
      axios
        .post('/books', { name, textBody })
        .then((result) => {
          setBooks(result.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div className='book-dashboard'>
      <h1>Add a book to Outlinear</h1>
      <TextField
        margin='normal'
        label='Title Your Book!'
        value={name}
        onChange={(e) => {
          setTriedSubmit(false);
          setName(e.target.value);
        }}
      />
      {triedSubmit && name === '' ? (
        <Alert severity='error'>Title cannot be empty</Alert>
      ) : null}
      <TextField
        margin='normal'
        variant='outlined'
        multiline
        label='Write a brief summary.'
        value={textBody}
        onChange={(e) => {
          setTriedSubmit(false);
          setTextBody(e.target.value);
        }}
      />
      {triedSubmit && textBody === '' ? (
        <Alert severity='error'>Summary cannot be empty</Alert>
      ) : null}

      <Button variant='contained' onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default NewBookDashboard;
