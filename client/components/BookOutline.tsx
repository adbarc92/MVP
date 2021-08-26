import React from 'react';

import { Book } from '../types';

import { List, Accordion } from '@material-ui/core';

interface BookOutlineProps {
  book: Book;
}

const BookOutline = (props: BookOutlineProps): JSX.Element => {
  return <div>{JSON.stringify(props.book)}</div>;
};

export default BookOutline;
