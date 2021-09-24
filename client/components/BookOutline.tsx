import React from 'react';
import axios from 'axios';

import { Book, Chapter } from '../types';

import List from '@material-ui/core/List';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface BookOutlineProps {
  book: Book;
  setBook: (book: Book) => void;
  setChapterToEdit: (chapter: Chapter) => void;
}

const BookOutline = ({
  book,
  setBook,
  setChapterToEdit
}: BookOutlineProps): JSX.Element => {
  const chapters = book?.chapters;

  const handleClick = () => {
    axios
      .post('/chapters', {
        name: '--NEW CHAPTER--',
        textBody: '--What happens?--',
        bookId: book.id
      })
      .then((res) => setBook(res.data))
      .catch((e) => {
        console.error('New chapter could not be created');
        console.error('Error:', e);
      });
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{book.name}</Typography>
        </AccordionSummary>
        {chapters
          ? chapters.map((chapter) => {
              return (
                <AccordionDetails
                  key={
                    chapter.name === '--NEW CHAPTER--'
                      ? '--NEW CHAPTER--' + chapter.id
                      : chapter.name
                  }
                >
                  <span style={{ cursor: 'pointer' }}>
                    <Typography
                      onClick={() => setChapterToEdit(chapter)}
                    >
                      {chapter.name}
                    </Typography>
                  </span>
                </AccordionDetails>
              );
            })
          : null}
      </Accordion>
      <Button onClick={handleClick}>
        <Typography>Create new chapter</Typography>
      </Button>
    </div>
  );
};

export default BookOutline;
