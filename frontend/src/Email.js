import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import {Hidden, Toolbar} from '@material-ui/core';
import SharedContext from './SharedContext';
import Star from './Star';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Search from './Search';

/**
 * Simple component with no state.
 * @return {object} JSX
 * @param {time} time date
 * See the basic-react from lecture 11 for an example of adding and
 * reacting to changes in state and lecture 16 for details on Material-UI
 * The date function was refrenced from assignment 5
 * stars: http://jsfiddle.net/wfyt32xc/
 */
function setDate(time) {
  const months =['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(time);
  const curDate = new Date();
  if (date.getFullYear() != curDate.getFullYear()) {
    return date.getFullYear().toString();
  } else if (date.getDate() == curDate.getDate() &&
      date.getMonth() == curDate.getMonth()) {
    return (date.getHours().toString() +
      ':' +
      date.getMinutes().toString());
  }
  return months[date.getMonth()] + ' ' + date.getDate().toString();
}

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: '2%',
    width: '100%',
  },
  divider: {
    width: '10px',
    height: 'auto',
    display: 'inline-block',
  },
  barView: {
    zIndex: theme.zIndex.drawer +400,
  },
}));

/**
 * @return {object} JSX
 */
function Email() {
  const {emails} = React.useContext(SharedContext);
  //   const {mailbox} = React.useContext(SharedContext);
  const {id} = React.useContext(SharedContext);
  const {handleClose} = React.useContext(SharedContext);
  const {handleOpenComposer} = React.useContext(SharedContext);
  const {setReply, setReplySub} = React.useContext(SharedContext);

  let curEmail = [];
  curEmail = emails.filter((email) => email.id == id);
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className = {classes.barView}>

        <Toolbar>
          <Hidden mdUp>
            <IconButton color="inherit"
              onClick = {handleClose}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Hidden>

          <Box display = 'flex' flexGrow={1}>
          </Box>
          <IconButton
            button
            color="inherit"
            onClick = {handleClose}
          >
            <MailIcon />
          </IconButton>

          <IconButton color="inherit" >
            <GetAppIcon />
          </IconButton>

          <IconButton color="inherit">
            <DeleteIcon />
          </IconButton>

        </Toolbar>
      </div>
      <table id='emails'>


        <tbody>
          {curEmail.map((email) => (
            <tr key={email.id} id={'id' + email.id}>
              <td>
                <h3> {email.mail.subject} </h3>
                <div style = {{marginBottom: 10}}>
                  {email.name.charAt(0).toUpperCase()}
                  {email.name.slice(1)}
                </div>
                <div style = {{display: 'inline-flex'}}>
                  <div> <Avatar alt={email.mail.from.name}
                    src="/static/images/avatar/1.jpg"
                    style = {{marginRight: 5, marginBottom: 10}} />
                  </div>

                  <div>
                    <div> {email.mail.from.name}
                      <div className = {classes.divider}> </div>
                      {setDate(email.mail.received.toString())}
                    </div>
                    {email.mail.from.email}
                  </div>

                </div>
                <div style = {{marginTop: '4%',
                  marginRight: 200, width: '100%'}}>
                  {email.mail.content}
                </div>

              </td>

              <Box display = 'flex' flexGrow={1} style = {{marginTop: 60}}>
              </Box>
              <tr>
                <div style = {{width: '80%', marginLeft: 'auto'}} >
                  <Star id = {email.id} />
                </div>

                <IconButton
                  button
                  color = 'inherit'
                  onClick = { () => {
                    handleOpenComposer();
                    setReply(email.mail.from.email);
                    setReplySub(email.mail.subject);
                  }
                  }
                >
                  <ArrowBackIcon />
                </IconButton>
              </tr>
            </tr>
          ))}

        </tbody>
      </table>
    </Paper>
  );
}

export default Email;
