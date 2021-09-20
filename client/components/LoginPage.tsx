import React, { useState, useReducer } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container
} from '@material-ui/core';
import firebaseApp from '../firebase';

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

interface LoginPageProps {
  setUser: () => void;
}

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

  const handleSubmit = (e) => {};

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          id='email'
          label='Email Address'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          id='password'
          label='Password'
          autoComplete='current-password'
        />
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <Button type='submit' fullWidth variant='contained'>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='#' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
