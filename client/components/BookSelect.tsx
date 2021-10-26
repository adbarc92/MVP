import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { Book } from '../types';

interface BookSelectProps {
  setBook: (book: Book) => void;
  books: Book[];
  setCreatingBook: (creatingState: boolean) => void;
}

const BookSelect = ({
  setBook,
  books,
  setCreatingBook
}: BookSelectProps): JSX.Element => {
  return (
    <div>
      <h3>Book List</h3>
      <List>
        {books.map((book) => (
          <ListItem key={book.name} onClick={() => setBook(book)}>
            <span style={{ cursor: 'pointer' }}>{book.name}</span>
          </ListItem>
        ))}
      </List>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          setCreatingBook(true);
        }}
      >
        Create New Book
      </Button>
    </div>
  );
};

export default BookSelect;
