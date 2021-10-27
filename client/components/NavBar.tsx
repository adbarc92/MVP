import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {
  getAuth,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';

interface NavBarProps {
  setUser: (user: FirebaseUser | null) => void;
  user: FirebaseUser | null;
}

const NavBar = ({ setUser, user }: NavBarProps): JSX.Element => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
        // TODO: Expand this
      });
  };

  return (
    <AppBar position='static'>
      <Toolbar variant='regular'>
        <Typography
          style={{
            fontFamily: 'fantasy',
            fontSize: '3rem'
          }}
          sx={{ flexGrow: 1 }}
        >
          Out-Linear
        </Typography>
        {user ? (
          <Button
            onClick={handleSignOut}
            variant='contained'
            disableElevation
          >
            Sign Out
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
