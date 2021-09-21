import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
