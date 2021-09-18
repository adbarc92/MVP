import React, { useState, useReducer } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

const initialState = {
  username: '',
  email: '',
  password: ''
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};

const LoginPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [inputState, dispatch] = useReducer(
    inputReducer,
    initialState
  );

  const toggleSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    dispatch({ type: 'field', name, value });
  };

  return (
    <Box>
      <TextField
        onChange={handleInputChange}
        label='login-username'
        id='login-username'
        required
      ></TextField>
      <TextField
        label='login-email'
        id='login-email'
        required
      ></TextField>
      <TextField
        label='login-password'
        id='login-password'
        type='password'
        required
      ></TextField>
      <TextField
        label='login-password-confirm'
        id='login-password-confirm'
        type='password'
        required
      ></TextField>
      <Button onClick={toggleSignUp}>
        {isSigningUp ? 'Log in' : 'Sign up'}
      </Button>
      <Button
        onClick={() => {
          console.debug('signing up!');
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default LoginPage;
