import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SharedContext from './SharedContext';


/**
 * @return {object} JSX
 */
export default function Composer() {
  const {openComposer, handleCloseComposer} = React.useContext(SharedContext);
  const {reply, replySub} = React.useContext(SharedContext);
  //   const {id, emails} = React.useContext(SharedContext);
  const {subVal, handleSubjectInput} = React.useContext(SharedContext);
  const {contVal, handleContentInput} = React.useContext(SharedContext);
  const {emailVal, handleEmailInput} = React.useContext(SharedContext);
  const {fetchMails, setMails, setError} = React.useContext(SharedContext);
  const mobileView = window.innerWidth;

  //   let sentMail =[];
  //   sentMail = emails.filter((email) => email.id == id);
  //   console.log(sentMail);
  const onSubmit = (event) => {
    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    fetch('/v0/mail', {
      method: 'POST',
      body: JSON.stringify( {'to-name': 'User',
        'to-email': emailVal,
        'from-name': user.name,
        'from-email': 'user@email.com',
        'subject': subVal,
        'content': contVal,
      }),
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw res;
          }
          return res.json();
        });
  };

  React.useEffect(() => {
    fetchMails(setMails, setError);
  }, [openComposer]);

  return (
    <div>
      <Dialog
        fullScreen = {mobileView < 769 ? true : false}
        open = {openComposer}
        onClose = {handleCloseComposer} >
        <DialogActions>
          <IconButton color="inherit"
            onClick={() => {
              handleCloseComposer();
              onSubmit();
            }}
          >
            <HighlightOffIcon />
          </IconButton>
          <Box display = 'flex' flexGrow={1}>
          </Box>
          <IconButton
            onClick={() => {
              handleCloseComposer();
              onSubmit();
            }}
            color="inherit" >
            <SendIcon/>
          </IconButton>

        </DialogActions>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label = 'To'
            type="email"
            onChange = {handleEmailInput}
            defaultValue = {reply.includes('@') ? reply : ''}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subject"
            defaultValue = {replySub ? replySub : ''}
            onChange = {handleSubjectInput}
            type="email"
            fullWidth
          />
          <TextField
            rows={10}
            multiline
            autoFocus
            margin="dense"
            id="name"
            onChange = {handleContentInput}
            fullWidth
            style = {{height: 200}}
          />
        </DialogContent>

      </Dialog>
    </div>
  );
}
