import React from 'react';

import { Book } from '../types';

import {
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';

interface BookOutlineProps {
  book: Book;
}

const BookOutline = ({ book }: BookOutlineProps): JSX.Element => {
  const chapters = book?.chapters;

  const handleClick = () => {
    // create new chapter
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{book.name}</Typography>
        </AccordionSummary>
        {chapters
          ? chapters.map((chapter) => {
              return (
                <AccordionDetails>
                  <Typography>{chapter.name}</Typography>
                </AccordionDetails>
              );
            })
          : null}
        <AccordionDetails>
          <Button onClick={handleClick}>
            <Typography>Create new chapter</Typography>
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BookOutline;
