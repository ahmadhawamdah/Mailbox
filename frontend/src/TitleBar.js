/* eslint-disable quote-props */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import EmailIcon from '@material-ui/icons/Email';
import SharedContext from './SharedContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Hidden} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      zIndex: theme.zIndex.drawer +300,
    },
  },
  // do not show the menuw button when browser is wide
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconButtons: {
    marginLeft: 'auto',
    color: 'white',
    position: 'relative',
    zIndex: theme.zIndex.drawer +500,
  },
  divider: {
    width: '10px',
    height: 'auto',
    display: 'inline-block',
  },

  icons: {
    margin: 20,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  mainText: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },

}));

/**
 * @return {oject} JSX
 */
function TitleBar() {
  // use 2 contexts out of 5 (variable, function)
  // icon button is the menuIcon
  // Typography is the title
  const {mailbox, toggleDrawerOpen} = React.useContext(SharedContext);
  const {setSearch} = React.useContext(SharedContext);
  const {handleOpenSearch} = React.useContext(SharedContext);
  const {handleOpenComposer} = React.useContext(SharedContext);
  const {handleOpenSettings} = React.useContext(SharedContext);
  const {setReply, setReplySub} = React.useContext(SharedContext);
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={toggleDrawerOpen ? classes.appBar : ''}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawerOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Hidden smDown implementation="css">
          <Typography variant="h6" noWrap>
          CSE183 Mail - {mailbox}
          </Typography>
        </Hidden>
        <div className={classes.divider}/>
        <SearchIcon />
        <div className={classes.divider}/>
        <input
          style = {{height: 20, width: 500}}
          placeholder="Search…"
          color = 'secondary'
          inputProps={{'aria-label': 'inherit'}}
          onClick = {handleOpenSearch}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div style = {{display: 'inline-flex', marginLeft: 'auto'}}>
          <IconButton
            className= {classes.iconButtons}
            onClick={handleOpenSettings}
          >
            <AccountCircleIcon/>
          </IconButton>

          <IconButton
            onClick = { () => {
              handleOpenComposer();
              setReply('');
              setReplySub('');
            }}
            className= {classes.iconButtons}

          >
            <EmailIcon/>
          </IconButton>

        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;
