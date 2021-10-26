import AppBar from '@mui/material/AppBar';
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
      <Typography
        style={{
          fontFamily: 'fantasy',
          fontSize: '3rem'
        }}
      >
        Out-Linear
      </Typography>
      {user ? (
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : null}
    </AppBar>
  );
};

export default NavBar;
