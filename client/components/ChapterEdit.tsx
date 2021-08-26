import React from 'react';
import { TextField, Checkbox, Button } from '@material-ui/core';

const ChapterEdit = (): JSX.Element => {
  return (
    <div>
      <TextField variant='outlined' label='Title' />
      <TextField variant='outlined' label='Summary' />
      <TextField variant='outlined' label='Bullets' />
    </div>
  );
};

export default ChapterEdit;
