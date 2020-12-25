import React from 'react';
import Content from './Content';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SharedContext from './SharedContext';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


/**
 * @return {object} JSX
 */
export default function SearchMobile() {
  const {openSearch,
    handleCloseSearch,
    setSearch} = React.useContext(SharedContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Dialog
      fullScreen = {fullScreen}
      open={openSearch}
      onClose= {handleCloseSearch}
    >
      <div style = {{marginTop: '4%'}}>

        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit"
              onClick = {handleCloseSearch}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <input
              style = {{height: 20, width: 500}}
              placeholder="Search…"
              color = 'secondary'
              inputProps={{'aria-label': 'inherit'}}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div style = {{marginLeft: 'auto'}}>

              <IconButton
                color="inherit"
                onClick = {() => setSearch('')}
              >
                <HighlightOffIcon/>
              </IconButton>

            </div>
          </Toolbar>
        </AppBar>
        <Content />
      </div>
    </Dialog>

  );
}
