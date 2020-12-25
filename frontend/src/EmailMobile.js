import React from 'react';
import Email from './Email';

import Dialog from '@material-ui/core/Dialog';

import Slide from '@material-ui/core/Slide';
import SharedContext from './SharedContext';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @return {object} JSX
 */
export default function FullScreenDialog() {
  const {open, handleClose} = React.useContext(SharedContext);


  return (
    <div>

      <Dialog
        fullScreen open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <Email />
      </Dialog>
    </div>
  );
}
