import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SharedContext from './SharedContext';
import Login from './Login';
import Home from './Home';


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const [mailbox, setMailbox] = React.useState('Inbox');
  // in mobile means nothing, this is only for desktop use
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // event listen on the window (we don't resize when on mobile view)
  window.addEventListener('resize', () => {
    setDrawerOpen(false);
  });

  // function to toggle the drawer (if open close, and if close open)
  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <BrowserRouter>
      <SharedContext.Provider value= {{
        mailbox, setMailbox,
        drawerOpen, setDrawerOpen,
        toggleDrawerOpen,
      }}>
        <Switch>
          <Route path ="/" exact>
            <Home />
          </Route>
          <Route path ="/login">
            <Login />
          </Route>
        </Switch>
      </SharedContext.Provider>
    </BrowserRouter>
  );
}

export default App;

