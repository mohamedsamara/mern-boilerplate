import React from 'react';

import { Link } from 'react-router-dom';
import { Result } from 'antd';

const page404: React.FC = (): JSX.Element => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/">Back Home</Link>}
    />
  );
};

export default page404;
