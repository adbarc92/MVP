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

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  AuthError,
  Auth
} from 'firebase/auth';

import { Alert } from '@material-ui/lab';

interface LoginError {
  code: string;
  message: string;
}
interface LoginState {
  email: string;
  password: string;
  triedSubmit: boolean;
  errors: LoginError[];
}

interface LoginAction {
  type: string;
  value: string;
  name: string;
}

const initialState: LoginState = {
  email: '',
  password: '',
  triedSubmit: false,
  errors: []
};

const inputReducer = (
  state: LoginState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case 'submit': {
      return {
        ...state,
        triedSubmit: true
      };
    }
    case 'error': {
      return {
        ...state,
        errors: [
          ...state.errors,
          { code: action.name, message: action.value }
        ]
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
  setUser: (user: FirebaseUser) => void;
}

const LoginPage = ({ setUser }: LoginPageProps): JSX.Element => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [inputState, dispatch] = useReducer(
    inputReducer,
    initialState
  );

  const toggleSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    dispatch({ type: 'field', name, value });
  };

  const handleAuthError = (error: AuthError): void => {
    const { code: errorCode, message: errorMessage } = error;
    console.error(`Error: ${errorCode}: ${errorMessage}`);
    dispatch({
      type: 'error',
      name: errorCode,
      value: errorMessage
    });
  };

  const handleSignUp = (auth: Auth): void => {
    const { email, password } = inputState;
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log('user:', user);
        setUser(user);
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  const handleSignIn = (auth: Auth): void => {
    const { email, password } = inputState;
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    const auth = getAuth();
    // TODO: Add validation here
    isSigningUp ? handleSignUp(auth) : handleSignIn(auth);
    dispatch({ type: 'reset', name: '', value: '' });
  };

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
          type='email'
          autoComplete='email'
          autoFocus
          onChange={handleInputChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <Button type='submit' fullWidth variant='contained'>
          {isSigningUp ? 'Sign Up' : 'Sign In'}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={toggleSignUp} variant='body2'>
              {isSigningUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      {inputState.triedSubmit && inputState.errors
        ? inputState.errors.map((error, i) => {
            return (
              <Alert severity='error'>{`${error.code}: ${error.message}`}</Alert>
            );
          })
        : null}
    </Container>
  );
};

export default LoginPage;
