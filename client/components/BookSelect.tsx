import React from 'react';
import { List, ListItem } from '@material-ui/core';

import { Book } from '../types';

interface BookSelectProps {
  setBook: (book: Book) => void;
  books: Book[];
}

const BookSelect = ({
  setBook,
  books
}: BookSelectProps): JSX.Element => {
  return (
    <List>
      {books.map((book) => (
        <ListItem key={book.name} onClick={() => setBook(book)} />
      ))}
    </List>
  );
};

export default BookSelect;