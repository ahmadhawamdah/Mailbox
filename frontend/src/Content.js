import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import TitleBar from './TitleBar';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Star from './Star';
import Avatar from '@material-ui/core/Avatar';
import SharedContext from './SharedContext';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TitleBar from './TitleBar';
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
  },
  bolded: {
    fontWeight: 'bold',
  },
}));


/**
 * @return {object} JSX
 */
function Content() {
  const {emails} = React.useContext(SharedContext);
  const {mailbox} = React.useContext(SharedContext);
  const {error} = React.useContext(SharedContext);
  const {search} = React.useContext(SharedContext);
  const {setID} = React.useContext(SharedContext);
  const {handleClickOpen} = React.useContext(SharedContext);
  const classes = useStyles();
  const {openRead} = React.useContext(SharedContext);
  const {fetchMails, setMails, setError} = React.useContext(SharedContext);
  /**
 * @param {string} id2
 */
  function handleOpenRead(id2) {
    // const ind = emails.findIndex(((obj) => obj.id == index),
    // );
    // console.log(ind);
    // emails[ind].mail.from.name = 'normal';
    // emails[ind].mail.subject = 'normal';
    document.getElementById(id2).style.fontWeight = 'normal';
  };
  /**
 * {function}
 * @param {string} id
 */
  function saveID(id) {
    setID(id);
  };
  return (
    <Paper className={classes.paper}>
      <CssBaseline />
      <Hidden mdUp implementation="css">
        <h3 > {mailbox}</h3>
      </Hidden>
      <table id='emails'>
        <tbody>
          {emails
              .sort(function(a, b) {
                return new Date(b.mail.received) -
                    new Date(a.mail.received);
              })
              .filter((email) => {
                if (search == '') {
                  return (email.name == mailbox.toLowerCase());
                } else if
                (email.mail.from.name.toLowerCase()
                    .includes(search.toLowerCase())) {
                  return (email.name == mailbox.toLowerCase());
                } else if (email.mail.subject.toLowerCase()
                    .includes(search.toLowerCase())) {
                  return (email.name == mailbox.toLowerCase());
                } else if (email.mail.content.toLowerCase()
                    .includes(search.toLowerCase())) {
                  return (email.name == mailbox.toLowerCase());
                }
              },
              )
              .map((email, index) => (
                <tr key={email.id} id={'id' + email.id} >
                  <Avatar alt={email.mail.from.name}
                    src="/static/images/avatar/1.jpg"
                    style = {{marginRight: 5}} />
                  <td>
                    <div className = {openRead ? '' : classes.bolded}
                      id = {email.id}
                    >

                      <div> {email.mail.from.name} </div>
                      <div> {email.mail.subject} </div>
                    </div>
                    <div button
                      onClick = {() => {
                        saveID(email.id);
                        handleClickOpen();
                        handleOpenRead(email.id);
                      }}
                      style= {{
                        whiteSpace: 'nowrap',
                        width: '250px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {email.mail.content} </div>
                  </td>
                  <td>
                    <div style = {{whiteSpace: 'nowrap'}}>
                      {setDate(email.mail.received.toString())}
                    </div>
                    <SharedContext.Provider
                      value = {{emails,
                        setMails, setError, fetchMails,
                      }}>
                      <Star id = {email.id} />
                    </SharedContext.Provider>
                  </td>
                </tr>
              ))}
          <tr key={'error'}>
            <td colSpan={4}>{error}</td>
          </tr>
        </tbody>
      </table>
    </Paper>

  );
}

export default Content;
