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
  console.log('books:', books);
  return (
    <div>
      <h3>Book List</h3>
      <List>
        {books.map((book) => (
          <ListItem key={book.name} onClick={() => setBook(book)}>
            {book.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BookSelect;
