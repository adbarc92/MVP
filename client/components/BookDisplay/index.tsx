import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import BookOutline from '../BookOutline';
import ChapterEdit from '../ChapterEdit';
import { Book, Chapter } from '../../types';
import './BookDisplay.css';

interface BookDisplayProps {
  book: Book;
  setBook: (book: Book) => void;
}

const BookDisplay = ({
  book,
  setBook
}: BookDisplayProps): JSX.Element => {
  const [chapterToEdit, setChapterToEdit] = useState<Chapter | null>(
    null
  );

  return (
    <div className='grid-container'>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <BookOutline
            book={book}
            setBook={setBook}
            setChapterToEdit={setChapterToEdit}
          />
        </Grid>
        <Grid item xs={6}>
          {chapterToEdit ? (
            <ChapterEdit chapter={chapterToEdit} setBook={setBook} />
          ) : (
            <span className='edit-prompt'>
              Select a chapter to edit!
            </span>
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography>This Panel will be used for details</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookDisplay;
