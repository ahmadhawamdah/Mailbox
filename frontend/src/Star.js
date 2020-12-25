/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import SharedContext from './SharedContext';


/**
* @param {string} props to fill yellow with a default of none
* @return {object} JSX Table
*/
function StarIcon(props) {
  const {fill = 'none'} = props;
  return (
    <svg fill={fill} stroke="currentColor" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
  );
}

/**
* @param {string} props
* status: # of starts
* ratng: if rating is 3 we show the 1st 3 starts to be yellow
* hoverRating: overrides the color when hovering over it
* @return {object} JSX Table
*/
function RatingIcon(props) {
  const {status, onClickColor, onSaveRating} = props;
  /*
  Pass a “create” function and an array of dependencies.
  anytime changes happen in the props, we'll recalculate
  */
  const fill = React.useMemo(() => {
    if (status === true) {
      return 'none';
    }
    return 'yellow';
  }, [status]);
  return (
    <div
      className ="cursorPointer"
      onClick={() => {
        onClickColor(!status);
        onSaveRating(!status);
      }
      }>
      <StarIcon fill={fill} />

    </div>
  );
}

const Star = (props) => {
  const {emails} = React.useContext(SharedContext);
  const [state, setRating] = React.useState(true);
  const [newMail, setMail] = React.useState([]);
  React.useEffect(() => {
    starredMail(setMail);
  }, [state]);

  const starredBox = emails.filter((email) => email.id == props.id);

  const onSaveRating = (status) => {
    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    fetch(
        // eslint-disable-next-line max-len
        `/v0/mail/${starredBox[0].id}?mailbox=${starredBox[0].name}&starred=${status}`, {
          method: 'put',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        });
  };

  const starredMail = (setMail) => {
    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    fetch(
        `http://localhost:3010/v0/mail/${props.id}`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
          setMail(json);
        });
  };


  const onClickColor = (status) => {
    setRating(status);
  };

  return (
    <span id ='emails.id'>
      {[1].map((status) => {
        return (
          <RatingIcon
            key = {props.key}
            status={state}
            onClickColor = {onClickColor}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </span>
  );
};

export default Star;
