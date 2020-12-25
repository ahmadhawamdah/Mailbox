import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import {Hidden, makeStyles} from '@material-ui/core/';
import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
  // changes background color of clicked element
  ListTop: {
    [theme.breakpoints.down('md')]: {
      marginTop: '0%',
      width: 250,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '8%',
    },
  },

  clickedButton: {
    backgroundColor: '#ADD8E6',
    color: 'black',
  },

  Header: {
    paddingTop: 0,
    marginTop: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


const boxes = [
  {name: 'Inbox', icon: <MailIcon/>},
  {name: 'Trash', icon: <DeleteIcon/>},
  {name: 'Sent', icon: <SendIcon/>},
];


// const createdBoxes = [];
/**
 * @return {object} JSX
 */
function MailboxList() {
  const classes = useStyles();

  const {mailbox, selectMailbox} = React.useContext(SharedContext);
  const {handleOpenSettings} = React.useContext(SharedContext);
  const {handleOpenStarred,
    handleCloseStarred} = React.useContext(SharedContext);
  return (
    <div>
      <List className = {classes.ListTop}>
        <Hidden mdUp implementation = "css">
          <ListItem>
            <h4> CSE183 Mail </h4>
          </ListItem>
        </Hidden>
        {boxes.map((box) => (
          <ListItem button
            key={box.name}
            disabled={mailbox == box.name}
            onClick={() => {
              selectMailbox(box.name); handleCloseStarred();
            }}
            className = {mailbox ? classes.clickedButton : ''}
          >
            <ListItemIcon style = {{color: 'black'}}>
              {box.icon}
            </ListItemIcon>
            <ListItemText primary={box.name}/>
          </ListItem>
        ))}

        <ListItem button
          onClick ={handleOpenStarred}
        >
          <ListItemIcon style = {{color: 'black'}}>
            <StarIcon />
          </ListItemIcon>
          <ListItemText> Starred </ListItemText>
        </ListItem>

        <ListItem button>
          <ListItemIcon style = {{color: 'black'}}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText> New Mailbox </ListItemText>
        </ListItem>

        <ListItem button onClick={handleOpenSettings}>
          <ListItemIcon style = {{color: 'black'}}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText> Settings </ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default MailboxList;
