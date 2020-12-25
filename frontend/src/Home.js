
import React from 'react';
import Content from './Content';
import TitleBar from './TitleBar';
import MailDrawer from './MailDrawer';
import Email from './Email';
import SharedContext from './SharedContext';
import EmailMobile from './EmailMobile';
import {Hidden} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SearchMobile from './SearchMobile';
import Composer from './Composer';
import Settings from './Settings';
import StarredMail from './StarredMail';

const fetchMails = (setMails, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/mail', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setError('');
        setMails(json);
      })
      .catch((error) => {
        setMails([]);
        setError(`${error.status} - ${error.statusText}`);
      });
};


const useStyles = makeStyles((theme) => ({
  hideOnClick: {
    display: 'none',
  },
  displayStar: {
    display: 'none',
  },
}));

// open ? classes.paper : classes.hideOnClick
/**
 * @return {object} JSX Table
 */
function Home() {
  const {mailbox, setMailbox} = React.useContext(SharedContext);
  const {drawerOpen, setDrawerOpen,
    toggleDrawerOpen} = React.useContext(SharedContext);

  const [emails, setMails] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [id, setID] = React.useState('');

  React.useState(emails ? emails.name : '');
  const [error, setError] = React.useState('Logged Out');


  React.useEffect(() => {
    fetchMails(setMails, setError);
  }, [drawerOpen]);

  // for email contents
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // for search bar
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  // for composer
  const [openComposer, setOpenComposer] = React.useState(false);
  const [subVal, setSubValue] = React.useState('');
  const [contVal, setContValue] = React.useState('');
  const [emailVal, setEmailValue] = React.useState('');

  const handleOpenComposer = () => {
    setOpenComposer(true);
  };
  const handleCloseComposer = () => {
    setOpenComposer(false);
  };
  const handleSubjectInput = (e) => {
    setSubValue(e.target.value);
  };
  const handleContentInput = (e) => {
    setContValue(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmailValue(e.target.value);
  };

  // for settings
  const [openSettings, setOpenSettings] = React.useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  // pre-populating the to and subject fields in composer when replying
  const [reply, setReply] = React.useState('');
  const [replySub, setReplySub] = React.useState('');

  // for starred
  const [starred, setStarred] = React.useState(false);
  const handleOpenStarred = () => {
    setStarred(true);
  };
  const handleCloseStarred = () => {
    setStarred(false);
  };

  // for read
  // const [openRead, setOpenRead] = React.useState(false);

  // const handleOpenRead = (ind) => {
  //   console.log(ind);

  //   setOpenRead(true);
  // };
  // const handleCloseRead = () => {
  //   setOpenRead(false);
  // };

  const classes = useStyles();
  return (
    <SharedContext.Provider
      value = {{emails, mailbox, setMailbox, search,
        setSearch, error, toggleDrawerOpen,
        drawerOpen, setDrawerOpen, id, setID, open,
        handleClickOpen, handleClose, handleCloseSearch,
        handleOpenSearch, openSearch, handleCloseComposer,
        openComposer, handleOpenComposer, setOpenComposer,
        openSettings, handleOpenSettings, handleCloseSettings,
        reply, setReply, replySub, setReplySub,
        handleSubjectInput, subVal, contVal, handleContentInput,
        emailVal, handleEmailInput, setMails, setError, fetchMails,
        starred, handleOpenStarred, handleCloseStarred,
      }}>
      <div>
        <div style = {{marginBottom: 40}}>
          <TitleBar />
        </div>
        <div style = {{display: 'inline-flex'}}>
          <MailDrawer />
          <div className= {starred ? classes.displayStar : ''}>
            <Content />
          </div>
          <div className= {starred ? '' : classes.displayStar}>
            <StarredMail />
          </div>
          <div className = {open ? '' : classes.hideOnClick}>
            <Hidden smDown implementation = 'css'>
              <Email />
            </Hidden>
          </div>
          <div style = {{position: 'absolute'}}>
            <Hidden smUp>
              <EmailMobile/>
            </Hidden>
          </div>
          <div style = {{position: 'absolute'}}>
            <Hidden smUp>
              <SearchMobile />
            </Hidden>
          </div>
          <div style = {{position: 'absolute'}}>
            <Composer />
          </div>
          <div style = {{position: 'absolute'}}>
            <Settings />
          </div>
        </div>
      </div>
    </SharedContext.Provider>
  );
}

export default Home;

// <Hidden mdDown implementation = 'css'>
// <Email />
// </Hidden>
