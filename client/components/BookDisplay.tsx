import React from 'react';
import { Grid } from '@material-ui/core';
import BookOutline from './BookOutline';
import { Book } from '../types';

interface BookDisplayProps {
  book: Book;
}

const BookDisplay = ({ book }: BookDisplayProps): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <BookOutline book={book} />
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default BookDisplay;
