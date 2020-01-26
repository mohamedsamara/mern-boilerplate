import React from 'react';

import { Link } from 'react-router-dom';

const page404 = () => {
  return (
    <div className="page404">
      <p>The page you requested was not found, for the following reasons</p>
      <ul className="list">
        <li>
          <p>
            If you typed the URL directly, please make sure the spelling is
            correct.
          </p>
        </li>
        <li>
          <p>If you clicked on a link to get here, the link is outdated.</p>
        </li>
      </ul>
      <Link to="/">Back To Home Page</Link>
    </div>
  );
};

export default page404;
