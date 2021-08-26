import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import BookOutline from './BookOutline';
import ChapterEdit from './ChapterEdit';
import { Book, Chapter } from '../types';

interface BookDisplayProps {
  book: Book;
}

const BookDisplay = ({ book }: BookDisplayProps): JSX.Element => {
  const [chapterToEdit, SetChapterToEdit] = useState<Chapter | null>(
    null
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <BookOutline book={book} />
      </Grid>
      <Grid item xs={6}>
        {chapterToEdit ? (
          <ChapterEdit chapter={chapterToEdit} />
        ) : (
          <span>Select a chapter to edit!</span>
        )}
      </Grid>
      <Grid item xs={3}>
        <Typography>This Panel will be used for details</Typography>
      </Grid>
    </Grid>
  );
};

export default BookDisplay;
