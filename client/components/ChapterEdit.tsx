import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button } from '@material-ui/core';
import { Chapter, Book } from '../types';

interface ChapterEditProps {
  chapter: Chapter;
  setBook: (book: Book) => void;
}

const ChapterEdit = ({
  chapter,
  setBook
}: ChapterEditProps): JSX.Element => {
  const [title, setTitle] = useState(chapter.name);
  const [summary, setSummary] = useState(chapter.textBody);

  const handleClick = () => {
    axios
      .put(`/chapter/${chapter.id}`, {
        ...chapter,
        name: title,
        textBody: summary
      })
      .then((res) => {
        setBook(res.data);
      })
      .catch((e) => {
        console.error(e);
        console.error('Chapter could not be updated');
      });
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
