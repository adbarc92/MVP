import React from 'react';
import { TextField } from '@material-ui/core';
import { Book } from '../types';

interface NewBookDashboardProps {
  setBooks: (books: Book[]) => void;
}

const NewBookDashboard = (): JSX.Element => {
  return (
    <div>
      <TextField></TextField>
    </div>
  );
};

export default NewBookDashboard;
