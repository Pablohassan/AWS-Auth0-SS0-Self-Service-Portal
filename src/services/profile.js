import {useAuth0} from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // console.log(user)

  return (
    isAuthenticated && (
      <div>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
          {Object.keys(user).map((objKey, i) => (
            <li key={i}>
              {objKey}: {user[objKey]}{' '}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Profile;
