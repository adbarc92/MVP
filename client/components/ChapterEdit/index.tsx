import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button } from '@material-ui/core';
import { Chapter, Book } from '../../types';
import './ChapterEdit.css';

interface ChapterEditProps {
  chapter: Chapter;
  setBook: (book: Book) => void;
  book: Book;
}

const ChapterEdit = ({
  chapter,
  setBook,
  book
}: ChapterEditProps): JSX.Element => {
  const [title, setTitle] = useState(chapter.name);
  const [summary, setSummary] = useState(chapter.textBody);

  const handleClick = () => {
    axios
      .put(`/chapters/${chapter.id}`, {
        ...chapter,
        name: title,
        textBody: summary,
        bookId: book.id
      })
      .then((res) => {
        console.log('chapter edit data:', res.data);
        setBook(res.data);
      })
      .catch((e) => {
        console.error(e);
        console.error('Chapter could not be updated');
      });
  };

  return (
    <div className='edit-container'>
      <TextField
        margin='normal'
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
        margin='normal'
        multiline
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
