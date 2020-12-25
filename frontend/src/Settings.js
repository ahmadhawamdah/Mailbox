import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SharedContext from './SharedContext';
import SaveIcon from '@material-ui/icons/Save';
import {Avatar, Hidden} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputBase from '@material-ui/core/InputBase';
/**
 * @return {object} JSX
 */
export default function Settings() {
  const [value, setValue] = React.useState(
      localStorage.getItem('val') || '',
  );
  React.useEffect(() => {
    localStorage.setItem('val', value);
  }, [value]);

  const {openSettings,
    handleCloseSettings} = React.useContext(SharedContext);


  const onChange = (event) => {
    setValue(event.target.value);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user.name;
  const res = userName.replace(/ /g, '');
  const userEmail = 'user@' + `${res.toLowerCase()}` + '.com';
  const mobileView = window.innerWidth;

  return (
    <div>
      <Dialog
        fullScreen = {mobileView < 769 ? true : false}
        open={openSettings}
        onClose={handleCloseSettings} >
        <DialogActions>
          <Hidden smDown>
            <IconButton color="inherit"
              onClick = {handleCloseSettings}
            >
              <HighlightOffIcon />
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <IconButton color="inherit"
              onClick = {handleCloseSettings}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Hidden>
          <Box display = 'flex' flexGrow={1}>
          </Box>
          <IconButton
            onClick={handleCloseSettings}
            color="inherit" >
            <SaveIcon/>
          </IconButton>
        </DialogActions>
        <DialogContent>
          <div style= {{
            display: 'inline-flex'}}>
            <div style= {{
              marginRight: 30,
              marginTop: 30}}>
              <Avatar/>
            </div>
            <div style = {{
              justifyContent: 'center',

            }}>
              <InputBase
                defaultValue = {userName}
                onChange = {onChange}
                value = {value}
              ></InputBase>
              <h3> {userEmail} </h3>
              <FormControlLabel
                control= {<Checkbox />}
                label="Show Avatar"
              />
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </div>
  );
}
