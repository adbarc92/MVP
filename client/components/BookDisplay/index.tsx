import React, { useState } from 'react';
import { Grid, Typography, Card } from '@material-ui/core';
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

  console.log('chapterToEdit:', chapterToEdit);

  return (
    <div className='grid-container'>
      <Grid alignItems='center' container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <BookOutline
              book={book}
              setBook={setBook}
              setChapterToEdit={setChapterToEdit}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            {chapterToEdit ? (
              <ChapterEdit
                key={chapterToEdit.id} // * Causes Rerender via Magic
                chapter={chapterToEdit}
                setBook={setBook}
                book={book}
              />
            ) : (
              <span className='edit-prompt'>
                Select a chapter to edit!
              </span>
            )}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Typography>
              This Panel will be used for details
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookDisplay;
