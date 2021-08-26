import React, { useState } from 'react';
import { TextField, Checkbox, Button } from '@material-ui/core';
import { Chapter } from '../types';

interface ChapterEditProps {
  chapter: Chapter;
}

const ChapterEdit = ({ chapter }: ChapterEditProps): JSX.Element => {
  const [title, setTitle] = useState(chapter.name);
  const [summary, setSummary] = useState(chapter.textBody);

  const handleClick = () => {
    // save chapter changes
  };

  return (
    <div>
      <TextField
        variant='outlined'
        label='Title'
        value={title}
        onChange={(e) => {
          setTitle((title) => e.target.value);
        }}
      >
        {title}
      </TextField>
      <TextField
        variant='outlined'
        label='Summary'
        value={summary}
        onChange={(e) => {
          setSummary((summary) => e.target.value);
        }}
      >
        {summary}
      </TextField>
      <Button variant='contained' onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default ChapterEdit;
