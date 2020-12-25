import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core/styles';
import {Checkbox} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

// import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
//   appBar: {
//     zIndex: theme.zIndex.drawer +200,
//   },
  textField: {
    margin: theme.spacing(-1),
    textAlign: 'center',
    width: 300,
    padding: theme.spacing(3),
  },
  Button: {
    width: 80,
    padding: theme.spacing(1),
  },
}));

/**
 * function Login
 * @return {login} container
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useHistory();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/auth', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          localStorage.setItem('user', JSON.stringify(json));
          history.push('/');
        })
        .catch((err) => {
          alert('Error logging in, please try again');
        });
  };

  const classes = useStyles();

  return (
    <form
      onSubmit={onSubmit}
      style= {{
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <div>
        <Container maxWidth = "xs">
          <h3>Login</h3>
          <Grid container>
            <TextField
              className={classes.textField}
              variant="outlined"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              required
            ></TextField>
          </Grid>
          <Grid>
            <TextField
              className={classes.textField}
              variant="outlined"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              required
            ></TextField>
          </Grid>
          <div style= {{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 16,
          }}>
            <FormControlLabel
              control= {<Checkbox />}
              label="Remember me"
            />

            <Button
              className={classes.Button}
              variant= "contained"
              type="submit"
              value= "Submit"
            >Sign in</Button>
          </div>
        </Container>
      </div>
    </ form>
  );
}

export default Login;
