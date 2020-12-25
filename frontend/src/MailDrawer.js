import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import SharedContext from './SharedContext';
import MailboxList from './MailboxList';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer +200,
  },
  drawer: {
    position: 'relative',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
}));

/**
 * @return {object} JSX
 */
function MailDrawer() {
  // passed by the context provider 5 contexts
  // you can also use context consumer in here
  const {mailbox, setMailbox, drawerOpen, setDrawerOpen, toggleDrawerOpen} =
    React.useContext(SharedContext);
  const {handleOpenSettings} = React.useContext(SharedContext);
  const {starred,
    handleOpenStarred, handleCloseStarred} = React.useContext(SharedContext);

  const selectMailbox= (mailbox) => {
    setMailbox(mailbox);
    setDrawerOpen(false);
  };

  const classes = useStyles();

  return (
    <SharedContext.Provider
      value={{
        mailbox, selectMailbox, handleOpenSettings, starred,
        handleOpenStarred, handleCloseStarred,
      }} >
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{paper: classes.drawerPaper}}
        >
          <MailboxList/>
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={() => {
            toggleDrawerOpen();
          }
          }
          ModalProps={{keepMounted: true}}
        >
          <MailboxList/>
        </Drawer>
      </Hidden>
    </SharedContext.Provider>
  );
}

export default MailDrawer;
